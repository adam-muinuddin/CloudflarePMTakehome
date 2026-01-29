import { mockFeedback } from './data/mock';
import { categorize, analyzeSentiment, estimateEffort, generateEmbedding, generateClusterTitle, generateClusterSummary, generateSolution } from './lib/ai';
import { calculateCredibility, calculatePriority } from './lib/scoring';
import type { MockFeedback, FeedbackRow, ClusterRow } from './types';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for all API routes
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (path === '/api/reset' && request.method === 'POST') {
        return addCors(await handleReset(env), corsHeaders);
      }
      if (path === '/api/seed' && request.method === 'POST') {
        return addCors(await handleSeed(env), corsHeaders);
      }
      if (path === '/api/insights' && request.method === 'GET') {
        return addCors(await handleInsights(env), corsHeaders);
      }
      if (path === '/api/feedback' && request.method === 'GET') {
        return addCors(await handleFeedback(url, env), corsHeaders);
      }
      if (path === '/api/similar' && request.method === 'GET') {
        return addCors(await handleSimilar(url, env), corsHeaders);
      }
      if (path === '/api/ask' && request.method === 'POST') {
        return addCors(await handleAsk(request, env), corsHeaders);
      }
      if (path === '/api/calculate-impact' && request.method === 'GET') {
        return addCors(await handleCalculateImpact(env), corsHeaders);
      }
      if (path === '/api/cluster' && request.method === 'POST') {
        return addCors(await handleCluster(env), corsHeaders);
      }
      if (path.startsWith('/api/cluster/') && path.endsWith('/feedback') && request.method === 'GET') {
        const clusterId = path.split('/')[3];
        return addCors(await handleClusterFeedback(clusterId, env), corsHeaders);
      }

      // Let static assets be served by the assets binding
      return new Response('Not Found', { status: 404 });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal Server Error';
      return addCors(
        Response.json({ error: message }, { status: 500 }),
        corsHeaders
      );
    }
  },
} satisfies ExportedHandler<Env>;

function addCors(response: Response, headers: Record<string, string>): Response {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(headers)) {
    newHeaders.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}

// ─── POST /api/reset ────────────────────────────────────────────────────────

async function handleReset(env: Env): Promise<Response> {
  await env.DB.batch([
    env.DB.prepare('DELETE FROM feedback'),
    env.DB.prepare('DELETE FROM clusters'),
  ]);
  return Response.json({ message: 'Database cleared successfully' });
}

// ─── POST /api/seed ─────────────────────────────────────────────────────────

async function handleSeed(env: Env): Promise<Response> {
  // Check which items are already seeded by content hash
  const { results: existing } = await env.DB.prepare(
    'SELECT content FROM feedback'
  ).all();
  const existingContent = new Set(
    (existing as unknown as { content: string }[]).map((r) => r.content)
  );

  // Filter to only unseedeed items
  const remaining = mockFeedback.filter(
    (item) => !existingContent.has(item.content)
  );

  if (remaining.length === 0) {
    return Response.json({
      message: 'All items already seeded.',
      total: existingContent.size,
    });
  }

  const results: { id: string; category: string; priority: number }[] = [];

  for (const item of remaining) {
    const result = await processAndStoreFeedback(env, item);
    results.push(result);
  }

  return Response.json({
    message: `Seeded ${results.length} new feedback items (${existingContent.size + results.length} total)`,
    results,
  });
}

async function processAndStoreFeedback(
  env: Env,
  item: MockFeedback
): Promise<{ id: string; category: string; priority: number }> {
  const id = crypto.randomUUID();

  // 1. Categorize
  const category = await categorize(env.AI, item.content);

  // 2. Sentiment
  const { sentiment, score: sentimentScore } = await analyzeSentiment(
    env.AI,
    item.content
  );

  // 3. Effort estimation
  const effort = await estimateEffort(env.AI, item.content);

  // 4. Credibility & Priority
  const credibility = calculateCredibility(
    item.source,
    item.engagement_count,
    item.is_paying_customer
  );
  const priority = calculatePriority(sentimentScore, credibility);

  // 5. Embedding
  const embedding = await generateEmbedding(env.AI, item.content);

  // 6. Store in D1
  await env.DB.prepare(
    `INSERT INTO feedback (id, source, content, category, sentiment, sentiment_score,
                           engagement_count, is_paying_customer, credibility_score,
                           priority_score, effort_score, created_at, processed_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 'completed')`
  )
    .bind(
      id,
      item.source,
      item.content,
      category,
      sentiment,
      sentimentScore,
      item.engagement_count,
      item.is_paying_customer ? 1 : 0,
      credibility,
      priority,
      effort,
      item.created_at
    )
    .run();

  // 6. Index in Vectorize
  await env.VECTORIZE.upsert([
    {
      id,
      values: embedding,
      metadata: { source: item.source, category, sentiment },
    },
  ]);

  return { id, category, priority };
}

// ─── GET /api/insights ──────────────────────────────────────────────────────

async function handleInsights(env: Env): Promise<Response> {
  // Check if clusters exist
  let clusterCount = 0;
  try {
    const cc = await env.DB.prepare('SELECT COUNT(*) as count FROM clusters').all();
    clusterCount = (cc.results[0] as { count: number }).count;
  } catch {
    // Table might not exist yet
  }

  const [totalResult, byCategoryResult, bySentimentResult, topPriorityResult] =
    await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as total FROM feedback').all(),
      env.DB.prepare(
        `SELECT category,
                COUNT(*) as count,
                ROUND(AVG(sentiment_score), 2) as avg_sentiment,
                ROUND(AVG(credibility_score), 2) as avg_credibility,
                ROUND(AVG(priority_score), 2) as avg_priority
         FROM feedback
         GROUP BY category
         ORDER BY count DESC`
      ).all(),
      env.DB.prepare(
        `SELECT sentiment, COUNT(*) as count
         FROM feedback
         GROUP BY sentiment`
      ).all(),
      clusterCount > 0
        ? env.DB.prepare(
            'SELECT * FROM clusters ORDER BY priority_score DESC LIMIT 10'
          ).all()
        : env.DB.prepare(
            `SELECT id, source, category, sentiment, sentiment_score,
                    credibility_score, priority_score, effort_score, impact_score,
                    content, created_at
             FROM feedback
             ORDER BY priority_score DESC
             LIMIT 10`
          ).all(),
    ]);

  return Response.json({
    total: (totalResult.results[0] as { total: number }).total,
    byCategory: byCategoryResult.results,
    bySentiment: bySentimentResult.results,
    topPriority: topPriorityResult.results,
    allClusters: clusterCount > 0
      ? (await env.DB.prepare('SELECT * FROM clusters ORDER BY priority_score DESC').all()).results
      : [],
    isClustered: clusterCount > 0,
  });
}

// ─── GET /api/feedback ──────────────────────────────────────────────────────

async function handleFeedback(url: URL, env: Env): Promise<Response> {
  const source = url.searchParams.get('source');
  const category = url.searchParams.get('category');
  const sentiment = url.searchParams.get('sentiment');
  const sort = url.searchParams.get('sort') || 'priority_score';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
  const offset = parseInt(url.searchParams.get('offset') || '0');

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (source) {
    conditions.push('source = ?');
    params.push(source);
  }
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (sentiment) {
    conditions.push('sentiment = ?');
    params.push(sentiment);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Whitelist sort columns
  const allowedSorts = [
    'priority_score',
    'credibility_score',
    'sentiment_score',
    'created_at',
    'engagement_count',
    'impact_score',
  ];
  const sortCol = allowedSorts.includes(sort) ? sort : 'priority_score';
  const sortDir = sortCol === 'created_at' ? 'DESC' : 'DESC';

  const query = `SELECT * FROM feedback ${where} ORDER BY ${sortCol} ${sortDir} LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...params).all();

  // Get total count for pagination
  const countQuery = `SELECT COUNT(*) as total FROM feedback ${where}`;
  const countParams = params.slice(0, -2); // remove limit and offset
  const countResult = await env.DB.prepare(countQuery)
    .bind(...countParams)
    .all();

  return Response.json({
    data: results,
    total: (countResult.results[0] as { total: number }).total,
    limit,
    offset,
  });
}

// ─── GET /api/similar?id=xxx ────────────────────────────────────────────────

async function handleSimilar(url: URL, env: Env): Promise<Response> {
  const id = url.searchParams.get('id');
  if (!id) {
    return Response.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  // Get the feedback item
  const { results } = await env.DB.prepare(
    'SELECT * FROM feedback WHERE id = ?'
  )
    .bind(id)
    .all();

  if (results.length === 0) {
    return Response.json({ error: 'Feedback not found' }, { status: 404 });
  }

  const item = results[0] as unknown as FeedbackRow;

  // Generate embedding for this item's content
  const embedding = await generateEmbedding(env.AI, item.content);

  // Query Vectorize for similar items
  const matches = await env.VECTORIZE.query(embedding, {
    topK: 6, // Get 6 to account for self-match
    returnMetadata: 'all',
  });

  // Filter out self and get top 5
  const similarIds = matches.matches
    .filter((m) => m.id !== id)
    .slice(0, 5)
    .map((m) => m.id);

  if (similarIds.length === 0) {
    return Response.json({ original: item, similar: [] });
  }

  // Fetch full records from D1
  const placeholders = similarIds.map(() => '?').join(',');
  const { results: similarItems } = await env.DB.prepare(
    `SELECT * FROM feedback WHERE id IN (${placeholders}) ORDER BY priority_score DESC`
  )
    .bind(...similarIds)
    .all();

  return Response.json({
    original: item,
    similar: similarItems,
  });
}

// ─── GET /api/calculate-impact ──────────────────────────────────────────────

async function handleCalculateImpact(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare('SELECT id, content FROM feedback').all();
  const items = results as unknown as { id: string; content: string }[];

  let updated = 0;

  for (const item of items) {
    const embedding = await generateEmbedding(env.AI, item.content);
    const matches = await env.VECTORIZE.query(embedding, {
      topK: 50,
      returnMetadata: 'all',
    });

    // Count matches with similarity > 0.8 (including self)
    const similarCount = matches.matches.filter((m) => m.score >= 0.8).length;
    const impact = Math.max(1, similarCount);

    await env.DB.prepare('UPDATE feedback SET impact_score = ? WHERE id = ?')
      .bind(impact, item.id)
      .run();
    updated++;
  }

  return Response.json({
    message: `Updated impact scores for ${updated} items`,
    total: updated,
  });
}

// ─── POST /api/cluster ──────────────────────────────────────────────────────

async function handleCluster(env: Env): Promise<Response> {
  // 1. Clear existing clusters
  await env.DB.prepare('UPDATE feedback SET cluster_id = NULL').run();
  await env.DB.prepare('DELETE FROM clusters').run();

  // 2. Fetch all feedback items
  const { results } = await env.DB.prepare(
    'SELECT id, content, category, sentiment_score, credibility_score, effort_score FROM feedback ORDER BY priority_score DESC'
  ).all();
  const items = results as unknown as {
    id: string;
    content: string;
    category: string;
    sentiment_score: number;
    credibility_score: number;
    effort_score: string;
  }[];

  // 3. Build item lookup map
  const itemMap = new Map(items.map((it) => [it.id, it]));
  const MAX_CLUSTERS = 15;
  const SIMILARITY_THRESHOLD = 0.68;

  // 4. Assign each item to exactly one cluster via a map (item_id → cluster_index)
  const itemCluster = new Map<string, number>(); // item_id → cluster index
  const clusterSeeds: { embedding: number[]; seedId: string }[] = [];

  for (const item of items) {
    if (itemCluster.has(item.id)) continue;

    const clusterIdx = clusterSeeds.length;
    const embedding = await generateEmbedding(env.AI, item.content);

    const matches = await env.VECTORIZE.query(embedding, {
      topK: 50,
      returnMetadata: 'all',
    });

    // Assign seed item
    itemCluster.set(item.id, clusterIdx);

    // Assign similar unassigned items to same cluster
    for (const m of matches.matches) {
      const mid = m.id as string;
      if (mid !== item.id && m.score >= SIMILARITY_THRESHOLD && !itemCluster.has(mid) && itemMap.has(mid)) {
        itemCluster.set(mid, clusterIdx);
      }
    }

    clusterSeeds.push({ embedding, seedId: item.id });
  }

  // 5. Collect members per cluster
  type ClusterMembers = { memberIds: string[] };
  const rawClusters: ClusterMembers[] = clusterSeeds.map(() => ({ memberIds: [] }));
  for (const [itemId, clusterIdx] of itemCluster) {
    rawClusters[clusterIdx].memberIds.push(itemId);
  }

  // 6. Cap at MAX_CLUSTERS: keep top clusters by size, fold rest
  const sortedIndices = rawClusters
    .map((c, i) => ({ i, size: c.memberIds.length }))
    .sort((a, b) => b.size - a.size);

  const keptIndices = new Set(sortedIndices.slice(0, MAX_CLUSTERS).map((s) => s.i));

  // For overflow items, reassign to nearest kept cluster
  if (sortedIndices.length > MAX_CLUSTERS) {
    const overflowItems: string[] = [];
    for (const { i } of sortedIndices.slice(MAX_CLUSTERS)) {
      overflowItems.push(...rawClusters[i].memberIds);
    }

    for (const itemId of overflowItems) {
      const it = itemMap.get(itemId)!;
      const emb = await generateEmbedding(env.AI, it.content);
      const matches = await env.VECTORIZE.query(emb, { topK: 10, returnMetadata: 'all' });

      let bestKept = sortedIndices[0].i; // default to largest
      for (const m of matches.matches) {
        const mid = m.id as string;
        const mc = itemCluster.get(mid);
        if (mc !== undefined && keptIndices.has(mc)) {
          bestKept = mc;
          break;
        }
      }
      itemCluster.set(itemId, bestKept);
    }
  }

  // 7. Build final cluster data from the assignment map
  type ClusterData = {
    id: string;
    memberIds: string[];
    contents: string[];
    categories: string[];
    sentiments: number[];
    credibilities: number[];
    efforts: string[];
  };
  const finalMap = new Map<number, ClusterData>();
  for (const idx of keptIndices) {
    finalMap.set(idx, {
      id: crypto.randomUUID(),
      memberIds: [],
      contents: [],
      categories: [],
      sentiments: [],
      credibilities: [],
      efforts: [],
    });
  }

  for (const [itemId, clusterIdx] of itemCluster) {
    const cluster = finalMap.get(clusterIdx);
    if (!cluster) continue; // shouldn't happen
    const it = itemMap.get(itemId)!;
    cluster.memberIds.push(itemId);
    cluster.contents.push(it.content);
    cluster.categories.push(it.category);
    cluster.sentiments.push(it.sentiment_score);
    cluster.credibilities.push(it.credibility_score);
    cluster.efforts.push(it.effort_score);
  }

  const finalClusters = [...finalMap.values()];

  // 5. Generate metadata and store each cluster
  const EFFORT_MULTIPLIER: Record<string, number> = { low: 1, medium: 2, high: 3 };
  const clusterResults: { id: string; title: string; impact: number }[] = [];

  for (const cluster of finalClusters) {
    // AI-generate title and summary in parallel
    const [title, summary] = await Promise.all([
      generateClusterTitle(env.AI, cluster.contents),
      generateClusterSummary(env.AI, cluster.contents),
    ]);

    // Mode of category
    const catCounts: Record<string, number> = {};
    for (const cat of cluster.categories) catCounts[cat] = (catCounts[cat] || 0) + 1;
    const category = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0][0];

    // Mode of effort
    const effCounts: Record<string, number> = {};
    for (const eff of cluster.efforts) effCounts[eff] = (effCounts[eff] || 0) + 1;
    const effortScore = Object.entries(effCounts).sort((a, b) => b[1] - a[1])[0][0];

    // Generate solution recommendation
    const solution = await generateSolution(env.AI, category, cluster.contents);

    // Calculate averages
    const sentimentAvg = cluster.sentiments.reduce((a, b) => a + b, 0) / cluster.sentiments.length;
    const credibilityAvg = cluster.credibilities.reduce((a, b) => a + b, 0) / cluster.credibilities.length;
    const impactScore = cluster.memberIds.length;

    // Priority: impact * (1 - sentiment_avg) / effort_multiplier
    const effortMult = EFFORT_MULTIPLIER[effortScore] || 2;
    const priorityScore = (impactScore * (1 - sentimentAvg)) / effortMult;

    const now = new Date().toISOString();

    // Insert cluster record
    await env.DB.prepare(
      `INSERT INTO clusters (id, title, summary, suggested_solution, category, sentiment_avg,
                             credibility_avg, priority_score, effort_score, impact_score,
                             created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        cluster.id, title, summary, solution, category,
        sentimentAvg, credibilityAvg, priorityScore,
        effortScore, impactScore, now, now
      )
      .run();

    // Update feedback items with cluster_id
    for (const memberId of cluster.memberIds) {
      await env.DB.prepare('UPDATE feedback SET cluster_id = ? WHERE id = ?')
        .bind(cluster.id, memberId)
        .run();
    }

    clusterResults.push({ id: cluster.id, title, impact: impactScore });
  }

  return Response.json({
    message: `Created ${finalClusters.length} clusters from ${items.length} feedback items`,
    clusters: clusterResults,
  });
}

// ─── GET /api/cluster/:id/feedback ──────────────────────────────────────────

async function handleClusterFeedback(clusterId: string, env: Env): Promise<Response> {
  if (!clusterId) {
    return Response.json({ error: 'Missing cluster ID' }, { status: 400 });
  }

  const { results } = await env.DB.prepare(
    'SELECT * FROM feedback WHERE cluster_id = ? ORDER BY priority_score DESC'
  )
    .bind(clusterId)
    .all();

  return Response.json({ data: results });
}

// ─── POST /api/ask (RAG) ───────────────────────────────────────────────────

async function handleAsk(request: Request, env: Env): Promise<Response> {
  const { question } = (await request.json()) as { question: string };
  if (!question) {
    return Response.json(
      { error: 'Missing question in request body' },
      { status: 400 }
    );
  }

  // 1. Embed the question
  const embedding = await generateEmbedding(env.AI, question);

  // 2. Find relevant feedback via Vectorize
  const matches = await env.VECTORIZE.query(embedding, {
    topK: 10,
    returnMetadata: 'all',
  });

  const ids = matches.matches.map((m) => m.id);
  if (ids.length === 0) {
    return Response.json({
      answer: 'No relevant feedback found.',
      sources: [],
    });
  }

  // 3. Get full content from D1
  const placeholders = ids.map(() => '?').join(',');
  const { results } = await env.DB.prepare(
    `SELECT * FROM feedback WHERE id IN (${placeholders}) ORDER BY priority_score DESC`
  )
    .bind(...ids)
    .all();

  // 4. Build context (top 5 to leave room for a complete response)
  const topResults = (results as unknown as FeedbackRow[]).slice(0, 5);
  const context = topResults
    .map(
      (r) =>
        `[${r.source}/${r.category}] (priority: ${r.priority_score.toFixed(2)}) ${r.content}`
    )
    .join('\n---\n');

  // 5. Generate answer with LLM
  const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `You are a product feedback analyst for Cloudflare. Answer concisely based on customer feedback data.
Format your response using markdown: use **bold** for key findings, bullet points for lists, and headings (##) to organize sections.
Be specific, cite the source channel (discord/github/twitter/support/forum), and mention priority scores when relevant.
Keep responses under 500 words. If the feedback doesn't answer the question, say so.`,
      },
      {
        role: 'user',
        content: `Customer feedback:\n${context}\n\nQuestion: ${question}`,
      },
    ],
    max_tokens: 1500,
  });

  return Response.json({
    answer: (response as { response: string }).response,
    sources: (results as unknown as FeedbackRow[]).slice(0, 5).map((r) => ({
      id: r.id,
      source: r.source,
      category: r.category,
      sentiment: r.sentiment,
      priority: r.priority_score,
      preview: r.content.slice(0, 120),
    })),
  });
}
