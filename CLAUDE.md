# CLAUDE.md - Feedback Aggregator Prototype

## Project Overview

**What:** A feedback aggregation and analysis tool that helps Product Managers at Cloudflare extract actionable insights from scattered customer feedback across multiple channels.

**Who:** PMs, support leads, and product executives who need to quickly identify patterns, prioritize fixes, and understand customer sentiment without manually sifting through 7+ unstructured data sources.

**Problem:** PMs spend hours manually reviewing feedback from Discord, GitHub issues, Twitter, support tickets, and forums. They miss emerging patterns, can't quantify severity, and struggle to prioritize what to fix first.

**Solution:** An AI-powered dashboard that automatically categorizes feedback, analyzes sentiment, and surfaces the highest-impact issues ranked by volume and severity.

---

## Architecture

### Product Tiers

#### 🔴 CORE (Must Ship)
| Product | Purpose |
|---------|---------|
| **Workers** | API endpoints, routing, serves frontend |
| **Workers AI** | Sentiment, categorization, embeddings, RAG |
| **D1 Database** | Structured storage + SQL aggregations |
| **Vectorize** | Semantic search for similar feedback |

#### 🟡 NICE TO HAVE (If Time Permits)
| Product | Purpose |
|---------|---------|
| **Workflows** | Retryable multi-step processing (can inline instead) |
| **KV** | Caching, deduplication (can skip for prototype) |
| **R2** | Attachment storage (mock data won't have attachments) |

---

### Core Data Flow (Simplified)

```
[Mock Data]
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  Workers: POST /api/seed                                │
│                                                         │
│  For each feedback item:                                │
│    1. Workers AI → categorize                           │
│    2. Workers AI → sentiment                            │
│    3. Calculate credibility + priority                  │
│    4. Workers AI → generate embedding                   │
│    5. D1 → insert row                                   │
│    6. Vectorize → upsert vector                         │
└─────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  Workers: GET /api/insights                             │
│                                                         │
│  D1 → aggregate by category, sentiment                  │
│  Return JSON for dashboard                              │
└─────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  Workers: POST /api/ask (RAG)                           │
│                                                         │
│  1. Workers AI → embed question                         │
│  2. Vectorize → find similar feedback                   │
│  3. D1 → get full content for context                   │
│  4. Workers AI → LLM generates answer                   │
└─────────────────────────────────────────────────────────┘
```

---

### Full Architecture (With Nice-to-Haves)

| Product | Purpose | Pipeline Step |
|---------|---------|---------------|
| **Workers** | API endpoints, request routing, serves frontend | All steps |
| **Workflows** | Orchestrates multi-step feedback processing pipeline | Step 2 |
| **Workers AI** | Sentiment analysis, categorization, embeddings, RAG responses | Steps 2, 3, 4 |
| **D1 Database** | Structured storage for feedback + aggregation queries | Steps 3, 4 |
| **AI Search / Vectorize** | Semantic search to find similar complaints + RAG context | Steps 3, 4 |
| **KV** | Caching, deduplication, rate limiting, session state | Steps 1, 4 |
| **R2** | Store raw attachments (screenshots, PDFs from tickets) | Step 1 |

### 4-Step Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: INGEST                                                              │
│                                                                             │
│  [Discord] [GitHub] [Twitter] [Support] [Forum]                             │
│       │        │        │         │        │                                │
│       └────────┴────────┴────┬────┴────────┘                                │
│                              ▼                                              │
│                    ┌─────────────────┐                                      │
│                    │  Workers API    │                                      │
│                    │  /api/ingest    │                                      │
│                    └────────┬────────┘                                      │
│                             │                                               │
│              ┌──────────────┼──────────────┐                                │
│              ▼              ▼              ▼                                │
│         ┌────────┐    ┌──────────┐   ┌──────────┐                           │
│         │   KV   │    │    R2    │   │ Workflow │                           │
│         │ dedup  │    │  attach  │   │  trigger │                           │
│         └────────┘    └──────────┘   └────┬─────┘                           │
└───────────────────────────────────────────┼─────────────────────────────────┘
                                            │
┌───────────────────────────────────────────┼─────────────────────────────────┐
│ STEP 2: PROCESS (Workflow)                ▼                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Cloudflare Workflow                              │    │
│  │                                                                     │    │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │    │
│  │  │   Step 1:    │    │   Step 2:    │    │   Step 3:    │          │    │
│  │  │  Categorize  │───▶│  Sentiment   │───▶│  Calculate   │          │    │
│  │  │  (Workers AI)│    │ (Workers AI) │    │  Credibility │          │    │
│  │  └──────────────┘    └──────────────┘    └──────┬───────┘          │    │
│  │                                                 │                   │    │
│  │                                                 ▼                   │    │
│  │                                          ┌──────────────┐          │    │
│  │                                          │   Step 4:    │          │    │
│  │                                          │   Persist    │──────────┼────┼──▶ Step 3
│  │                                          └──────────────┘          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: STORE & INDEX                                                       │
│                                                                             │
│  From Workflow Step 4:                                                      │
│         │                                                                   │
│         ├──────────────────────────────────┐                                │
│         ▼                                  ▼                                │
│  ┌─────────────────┐              ┌─────────────────┐                       │
│  │   D1 Database   │              │  AI Search /    │                       │
│  │                 │              │   Vectorize     │                       │
│  │ • feedback row  │              │                 │                       │
│  │ • category      │              │ • embedding     │                       │
│  │ • sentiment     │              │ • metadata      │                       │
│  │ • credibility   │              │ • similarity    │                       │
│  │ • priority      │              │                 │                       │
│  └────────┬────────┘              └────────┬────────┘                       │
│           │                                │                                │
└───────────┼────────────────────────────────┼────────────────────────────────┘
            │                                │
┌───────────┼────────────────────────────────┼────────────────────────────────┐
│ STEP 4: QUERY & REPORT                     │                                │
│           │                                │                                │
│           ▼                                ▼                                │
│  ┌─────────────────┐              ┌─────────────────┐                       │
│  │  SQL Queries    │              │ Semantic Search │                       │
│  │  (aggregations) │              │ (find similar)  │                       │
│  └────────┬────────┘              └────────┬────────┘                       │
│           │                                │                                │
│           └────────────┬───────────────────┘                                │
│                        ▼                                                    │
│               ┌─────────────────┐                                           │
│               │   Workers AI    │                                           │
│               │   (RAG + LLM)   │                                           │
│               │                 │                                           │
│               │ "What are the   │                                           │
│               │  top issues     │                                           │
│               │  this week?"    │                                           │
│               └────────┬────────┘                                           │
│                        │                                                    │
│           ┌────────────┼────────────┐                                       │
│           ▼            ▼            ▼                                       │
│    ┌───────────┐ ┌───────────┐ ┌───────────┐                                │
│    │ Dashboard │ │  Custom   │ │   Slack   │                                │
│    │   UI      │ │  Reports  │ │  Alerts   │                                │
│    └───────────┘ └───────────┘ └───────────┘                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Product Justifications

**Workers** — The orchestration layer. Handles HTTP requests, routes to appropriate handlers, serves the static frontend. Every request flows through Workers.

**Workflows** — Critical for reliability. If Workers AI times out mid-analysis, the workflow retries from the last successful step instead of losing the feedback. Also enables future enhancements like "wait for human review" steps.

**Workers AI** — Three distinct uses:
1. `@cf/meta/llama-3.1-8b-instruct` for categorization
2. `@cf/huggingface/distilbert-sst-2-int8` for sentiment (fast, specialized)
3. `@cf/baai/bge-base-en-v1.5` for embeddings
4. LLM again for RAG responses to natural language queries

**D1** — Structured queries: "Show me all negative feedback about performance from paying customers this week." SQL is the right tool for filtering, sorting, aggregating.

**AI Search / Vectorize** — Semantic queries: "Find complaints similar to 'the dashboard is slow.'" Returns conceptually related feedback even with different wording.

**KV** — Three uses:
1. **Deduplication**: Store hash of feedback content, skip if seen before
2. **Rate limiting**: Track requests per source to prevent spam
3. **Cache**: Store expensive aggregation results for dashboard (TTL: 5 min)

**R2** — Store attachments from support tickets (screenshots, log files, PDFs). Reference the R2 key in D1 row. Enables future feature: "show me the screenshot attached to this complaint."

---

## Technical Specifications

### Data Model (D1 Schema)

```sql
CREATE TABLE feedback (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,           -- 'discord', 'github', 'twitter', 'support', 'forum'
    source_url TEXT,                -- link to original
    content TEXT NOT NULL,          -- raw feedback text
    
    -- AI-generated analysis
    category TEXT,                  -- AI-assigned: 'performance', 'pricing', 'docs', 'reliability', 'dx', 'other'
    sentiment TEXT,                 -- 'positive', 'negative', 'neutral'
    sentiment_score REAL,           -- -1.0 (very negative) to 1.0 (very positive)
    
    -- Credibility factors (from source metadata)
    engagement_count INTEGER DEFAULT 0,   -- likes, upvotes, reactions, replies
    is_paying_customer BOOLEAN DEFAULT 0, -- enterprise/pro vs free tier
    
    -- Computed scores
    credibility_score REAL,         -- 0.0 to 1.0 (weight of this signal)
    priority_score REAL,            -- combines negativity × credibility (higher = fix first)
    
    -- Attachment (R2 reference)
    attachment_key TEXT,            -- R2 object key if attachment exists
    attachment_type TEXT,           -- mime type: 'image/png', 'application/pdf', etc.
    
    -- Timestamps
    created_at TEXT NOT NULL,       -- ISO timestamp (when feedback was created)
    processed_at TEXT,              -- when AI analyzed it
    
    -- Processing status
    status TEXT DEFAULT 'pending'   -- 'pending', 'processing', 'completed', 'failed'
);

CREATE INDEX idx_category ON feedback(category);
CREATE INDEX idx_sentiment ON feedback(sentiment);
CREATE INDEX idx_source ON feedback(source);
CREATE INDEX idx_priority ON feedback(priority_score DESC);
CREATE INDEX idx_status ON feedback(status);
CREATE INDEX idx_created ON feedback(created_at DESC);
```

### Credibility & Priority Scoring Logic

**Source Base Weights:**
| Source | Base Weight | Rationale |
|--------|-------------|-----------|
| support | 0.9 | Paying customer, formal ticket, specific issue |
| github | 0.7 | Technical user, reproducible bug report |
| discord | 0.5 | Community member, variable quality |
| forum | 0.5 | Similar to Discord |
| twitter | 0.3 | Often vague, performative, context-free |

**Credibility Calculation:**
```typescript
const SOURCE_WEIGHTS: Record<string, number> = {
  support: 0.9,
  github: 0.7,
  discord: 0.5,
  forum: 0.5,
  twitter: 0.3,
};

function calculateCredibility(
  source: string,
  engagementCount: number,
  isPayingCustomer: boolean
): number {
  let score = SOURCE_WEIGHTS[source] || 0.3;
  
  // Engagement boost (logarithmic to prevent viral outliers from dominating)
  // 10 engagements = +0.1, 100 = +0.2, 1000 = +0.3 (capped)
  if (engagementCount > 0) {
    const engagementBoost = Math.min(0.3, Math.log10(engagementCount) * 0.1);
    score += engagementBoost;
  }
  
  // Paying customer boost
  if (isPayingCustomer) {
    score += 0.2;
  }
  
  return Math.min(1.0, score); // Cap at 1.0
}
```

**Priority Calculation:**
```typescript
function calculatePriority(
  sentimentScore: number,    // -1.0 to 1.0
  credibilityScore: number   // 0.0 to 1.0
): number {
  // Convert sentiment to negativity (more negative = higher value)
  // sentiment -1.0 → negativity 1.0
  // sentiment +1.0 → negativity 0.0
  const negativity = (1 - sentimentScore) / 2;
  
  // Priority = how negative × how credible
  return negativity * credibilityScore;
}
```

**Example Calculations:**
| Feedback | Sentiment | Source | Engagement | Paying? | Credibility | Priority |
|----------|-----------|--------|------------|---------|-------------|----------|
| Viral angry tweet | -0.8 | twitter | 5000 | No | 0.6 | 0.54 |
| Enterprise support ticket | -0.6 | support | 0 | Yes | 1.0 | 0.80 |
| Random Discord complaint | -0.9 | discord | 3 | No | 0.55 | 0.52 |
| GitHub bug report | -0.4 | github | 47 | No | 0.87 | 0.61 |
| Positive tweet | +0.7 | twitter | 200 | No | 0.53 | 0.08 |
```

### API Endpoints

#### 🔴 CORE Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/seed` | POST | Populate DB with mock data (processed by AI) |
| `/api/insights` | GET | Aggregated stats by category/sentiment |
| `/api/feedback` | GET | List feedback with filters |
| `/api/similar?id=xxx` | GET | Find semantically similar feedback |
| `/api/ask` | POST | Natural language query (RAG) |

#### 🟡 NICE TO HAVE Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ingest` | POST | Live feedback ingestion (triggers workflow) |
| `/api/feedback/:id` | GET | Single item with full details |
| `/api/attachment/:id` | GET | Retrieve R2 attachment |

### Core Processing Logic (Inline in /api/seed)

```typescript
// Simplified inline processing - no workflow needed for prototype
async function processAndStoreFeedback(env: Env, item: MockFeedback) {
  const id = crypto.randomUUID();
  
  // 1. Categorize
  const categoryResult = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { role: 'system', content: 'Categorize into: performance, pricing, docs, reliability, dx, other. Reply with only the category.' },
      { role: 'user', content: item.content }
    ]
  });
  const category = categoryResult.response.trim().toLowerCase();

  // 2. Sentiment
  const sentimentResult = await env.AI.run('@cf/huggingface/distilbert-sst-2-int8', { 
    text: item.content 
  });
  const sentimentScore = sentimentResult[0].label === 'POSITIVE' 
    ? sentimentResult[0].score 
    : -sentimentResult[0].score;

  // 3. Credibility & Priority
  const credibility = calculateCredibility(item.source, item.engagement_count, item.is_paying_customer);
  const priority = calculatePriority(sentimentScore, credibility);

  // 4. Embedding
  const embeddingResult = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
    text: [item.content]
  });

  // 5. Store in D1
  await env.DB.prepare(`
    INSERT INTO feedback (id, source, content, category, sentiment, sentiment_score,
                          engagement_count, is_paying_customer, credibility_score, 
                          priority_score, created_at, processed_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 'completed')
  `).bind(id, item.source, item.content, category,
          sentimentScore > 0 ? 'positive' : 'negative', sentimentScore,
          item.engagement_count, item.is_paying_customer ? 1 : 0,
          credibility, priority, item.created_at).run();

  // 6. Index in Vectorize
  await env.VECTORIZE.upsert([{
    id,
    values: embeddingResult.data[0],
    metadata: { source: item.source, category, sentiment: sentimentScore > 0 ? 'positive' : 'negative' }
  }]);

  return { id, category, priority };
}
```

### RAG Query Implementation

```typescript
// POST /api/ask - The impressive feature
async function handleAsk(request: Request, env: Env) {
  const { question } = await request.json<{ question: string }>();
  
  // 1. Embed the question
  const embedding = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
    text: [question]
  });
  
  // 2. Find relevant feedback
  const matches = await env.VECTORIZE.query(embedding.data[0], {
    topK: 10,
    returnMetadata: 'all'
  });
  
  // 3. Get full content from D1
  const ids = matches.matches.map(m => m.id);
  if (ids.length === 0) {
    return Response.json({ answer: "No relevant feedback found.", sources: [] });
  }
  
  const { results } = await env.DB.prepare(
    `SELECT * FROM feedback WHERE id IN (${ids.map(() => '?').join(',')}) ORDER BY priority_score DESC`
  ).bind(...ids).all();
  
  // 4. Build context
  const context = results.map(r => 
    `[${r.source}/${r.category}] ${r.content}`
  ).join('\n---\n');
  
  // 5. Generate answer
  const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { 
        role: 'system', 
        content: `You are a product feedback analyst. Answer questions based on customer feedback.
Be specific and cite sources. If feedback doesn't answer the question, say so.` 
      },
      { role: 'user', content: `Feedback:\n${context}\n\nQuestion: ${question}` }
    ]
  });
  
  return Response.json({
    answer: response.response,
    sources: results.slice(0, 5).map(r => ({ 
      id: r.id, 
      source: r.source, 
      category: r.category,
      preview: r.content.slice(0, 100) 
    }))
  });
}
```

---

## 🟡 Nice-to-Have Code (Reference Only)

### Workers AI Prompts

**Categorization Prompt:**
```
Categorize this customer feedback into exactly ONE of these categories:
- performance: speed, latency, timeouts
- pricing: cost, billing, plans
- docs: documentation, guides, examples
- reliability: uptime, errors, outages
- dx: developer experience, API design, tooling
- other: doesn't fit above

Feedback: "{content}"

Respond with ONLY the category name, nothing else.
```

**Sentiment Prompt:**
```
Analyze the sentiment of this customer feedback.
Respond in JSON format: {"sentiment": "positive|negative|neutral", "score": <float from -1 to 1>}

Feedback: "{content}"
```

---

## Mock Data Requirements

Generate 30-50 mock feedback entries with realistic distribution:
- **Sources:** discord (30%), github (25%), twitter (20%), support (15%), forum (10%)
- **Categories:** performance (25%), dx (25%), docs (20%), reliability (15%), pricing (10%), other (5%)
- **Sentiment:** negative (50%), neutral (30%), positive (20%) - skewed negative since it's feedback/complaints
- **Engagement:** Varied realistically per source (tweets: 0-500, GitHub issues: 0-50 reactions, etc.)
- **Paying customers:** ~40% of support tickets, ~20% of GitHub issues, 0% of Twitter/Discord

Example mock entries:
```json
{
  "source": "discord",
  "content": "Workers cold starts are killing our API response times. We're seeing 200ms+ delays on first request.",
  "engagement_count": 12,
  "is_paying_customer": false,
  "created_at": "2026-01-15T14:32:00Z"
}
```

```json
{
  "source": "support",
  "content": "Our enterprise dashboard has been showing incorrect analytics for the past 3 days. This is affecting our billing reconciliation. Ticket #48291",
  "engagement_count": 0,
  "is_paying_customer": true,
  "created_at": "2026-01-20T09:15:00Z"
}
```

```json
{
  "source": "twitter",
  "content": "cloudflare workers is so slow today wtf",
  "engagement_count": 847,
  "is_paying_customer": false,
  "created_at": "2026-01-22T16:45:00Z"
}
```

---

## Frontend Requirements

### Dashboard Views

**1. Overview Panel**
- Total feedback count
- Sentiment breakdown (pie/donut chart)
- Average credibility score
- Top 3 highest-priority items (quick action list)

**2. Category Breakdown**
- Bar chart showing feedback volume by category
- Color-coded by average sentiment per category
- Bubble size or secondary indicator showing avg priority score
- Click category to filter list

**3. Priority Queue**
- Top 10 items sorted by priority_score DESC
- Shows: Source badge, category, sentiment indicator, credibility bar, preview
- Visual emphasis on high-credibility negative feedback
- This is the "fix these first" view

**4. Feedback List**
- Sortable/filterable table
- Columns: Source icon, Category badge, Sentiment, Credibility, Priority, Preview, Date
- Click row to expand full content + source link
- Filters: source, category, sentiment, date range, min credibility

**5. Credibility Explainer (tooltip/modal)**
- When user hovers on credibility score, show breakdown:
  - Base source weight: 0.7
  - Engagement boost: +0.17 (47 reactions)
  - Paying customer: +0.0
  - **Total: 0.87**

### Tech Stack for Frontend
- Plain HTML/CSS/JS (keeps it simple, deploys easily on Workers)
- OR: Single React component with Tailwind
- Charts: Chart.js or simple CSS-based bars

---

## File Structure

### 🔴 CORE Files

```
/
├── wrangler.toml               # Cloudflare config
├── schema.sql                  # D1 schema
├── src/
│   ├── index.ts                # Main worker: routing + handlers
│   ├── types.ts                # TypeScript types
│   ├── lib/
│   │   ├── ai.ts               # Workers AI helpers
│   │   ├── db.ts               # D1 query helpers  
│   │   └── scoring.ts          # Credibility/priority calc
│   └── data/
│       └── mock.ts             # Mock data (30-50 items)
└── public/
    └── index.html              # Dashboard (single file)
```

### 🟡 NICE TO HAVE Files (Add if time)

```
├── src/
│   ├── routes/                 # Split handlers into files
│   │   ├── ingest.ts
│   │   ├── feedback.ts
│   │   ├── insights.ts
│   │   ├── similar.ts
│   │   └── ask.ts
│   ├── workflows/
│   │   └── process-feedback.ts # Workflow class
│   └── lib/
│       ├── kv.ts               # Cache helpers
│       └── r2.ts               # Attachment helpers
├── public/
│   ├── styles.css              # Separate styles
│   └── app.js                  # Separate JS
└── migrations/
    └── 0001_initial.sql        # Proper migration
```

---

## Wrangler Configuration

### 🔴 CORE Configuration (Start with this)

```toml
name = "feedback-aggregator"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Workers AI binding
[ai]
binding = "AI"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "feedback-db"
database_id = "<run: npx wrangler d1 create feedback-db>"

# Vectorize (Semantic Search)
[[vectorize]]
binding = "VECTORIZE"
index_name = "feedback-index"

# Static assets
[assets]
directory = "./public"
```

### 🟡 NICE TO HAVE Bindings (Add if time)

```toml
# KV Namespace (for caching)
[[kv_namespaces]]
binding = "KV"
id = "<run: npx wrangler kv namespace create feedback-cache>"

# R2 Bucket (for attachments)
[[r2_buckets]]
binding = "R2"
bucket_name = "feedback-attachments"

# Workflows (for retryable processing)
[[workflows]]
binding = "FEEDBACK_WORKFLOW"
name = "process-feedback-workflow"
class_name = "ProcessFeedbackWorkflow"
```

### Environment Type Definition

```typescript
// src/types.ts

// 🔴 CORE
export interface Env {
  AI: Ai;
  DB: D1Database;
  VECTORIZE: VectorizeIndex;
}

// 🟡 With nice-to-haves
export interface EnvFull extends Env {
  KV: KVNamespace;
  R2: R2Bucket;
  FEEDBACK_WORKFLOW: Workflow;
}
```

---

## Build Priorities (Time-Boxed)

### 🔴 CORE - Must Complete (90 min)

#### Phase 1: Setup (15 min)
- [ ] `npm create cloudflare@latest feedback-aggregator`
- [ ] Add D1 + Vectorize + AI bindings to wrangler.toml
- [ ] Create D1 database: `npx wrangler d1 create feedback-db`
- [ ] Create Vectorize index: `npx wrangler vectorize create feedback-index --dimensions=768 --metric=cosine`
- [ ] Run schema migration

#### Phase 2: Seed + Process (35 min)
- [ ] Mock data generator (30-50 entries)
- [ ] `/api/seed` endpoint that:
  - Loops through mock data
  - Calls Workers AI for category + sentiment + embedding
  - Calculates credibility/priority scores
  - Inserts into D1
  - Upserts into Vectorize

#### Phase 3: Query APIs (25 min)
- [ ] `/api/insights` — aggregated stats by category/sentiment
- [ ] `/api/feedback` — list with filters
- [ ] `/api/similar?id=xxx` — find similar via Vectorize
- [ ] `/api/ask` — RAG query (the impressive feature)

#### Phase 4: Dashboard (15 min)
- [ ] Basic HTML with:
  - Category breakdown (bar chart or simple bars)
  - Priority queue (top 10 items)
  - "Ask a question" input → shows RAG response
  - Click item → show details

---

### 🟡 NICE TO HAVE - Only If Core Complete (30 min)

#### Workflows
- [ ] Extract processing logic into `ProcessFeedbackWorkflow` class
- [ ] Add retry logic for AI calls
- [ ] Change `/api/ingest` to trigger workflow instead of inline processing

#### KV Caching
- [ ] Cache `/api/insights` response (5 min TTL)
- [ ] Add deduplication check on ingest

#### R2 Attachments
- [ ] Add `attachment_key` field to schema
- [ ] Upload endpoint for files
- [ ] Display attachment link in feedback detail

#### Polish
- [ ] Better error handling
- [ ] Loading states in UI
- [ ] Source icons/badges
- [ ] Trend over time chart

---

## Commands Reference

### 🔴 CORE Setup (Run these first)

```bash
# 1. Create project
npm create cloudflare@latest feedback-aggregator
cd feedback-aggregator

# 2. Create D1 database
npx wrangler d1 create feedback-db
# ⚠️ Copy the database_id into wrangler.toml

# 3. Create Vectorize index
npx wrangler vectorize create feedback-index --dimensions=768 --metric=cosine

# 4. Run schema
npx wrangler d1 execute feedback-db --local --file=./schema.sql

# 5. Develop locally
npx wrangler dev

# 6. Deploy
npx wrangler d1 execute feedback-db --remote --file=./schema.sql
npx wrangler deploy
```

### 🟡 NICE TO HAVE Setup (Only if adding those features)

```bash
# KV Namespace
npx wrangler kv namespace create feedback-cache
# Copy id to wrangler.toml

# R2 Bucket  
npx wrangler r2 bucket create feedback-attachments

# Vectorize metadata indexes (for filtering)
npx wrangler vectorize create-metadata-index feedback-index --property-name=category --type=string
npx wrangler vectorize create-metadata-index feedback-index --property-name=sentiment --type=string
```

### Debug Commands

```bash
npx wrangler tail                                    # Live logs
npx wrangler d1 execute feedback-db --local --command="SELECT * FROM feedback LIMIT 5"
```

---

## Success Criteria

### 🔴 CORE - Prototype is successful if:

1. **Seeded Data:** 30-50 mock feedback items processed and stored
2. **AI Analysis:** Each item has category + sentiment + embedding
3. **Credibility Scoring:** Priority calculated from source weight + engagement
4. **SQL Queries:** `/api/insights` returns aggregations by category
5. **Semantic Search:** `/api/similar` finds conceptually related feedback
6. **RAG Works:** `/api/ask` answers natural language questions with citations
7. **Dashboard:** Visual display showing actionable insights

### Cloudflare Product Checklist

#### 🔴 CORE (Required)
| Product | Status | Usage |
|---------|--------|-------|
| Workers | ☐ | API + static serving |
| Workers AI | ☐ | Categorization, sentiment, embeddings, RAG |
| D1 | ☐ | Structured storage + aggregations |
| Vectorize | ☐ | Semantic similarity search |

#### 🟡 NICE TO HAVE (Bonus points)
| Product | Status | Usage |
|---------|--------|-------|
| Workflows | ☐ | Retryable processing pipeline |
| KV | ☐ | Caching + deduplication |
| R2 | ☐ | Attachment storage |

---

**Remember:** A working prototype with 4 products > a broken prototype attempting 7 products.
