const VALID_CATEGORIES = ['performance', 'pricing', 'docs', 'reliability', 'dx', 'other'];

export async function categorize(ai: Ai, content: string): Promise<string> {
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `Categorize this customer feedback into exactly ONE of these categories:
- performance: speed, latency, timeouts
- pricing: cost, billing, plans
- docs: documentation, guides, examples
- reliability: uptime, errors, outages
- dx: developer experience, API design, tooling
- other: doesn't fit above

Respond with ONLY the category name, nothing else.`,
      },
      { role: 'user', content },
    ],
  });

  const raw = ((result as unknown) as { response: string }).response.trim().toLowerCase();
  // Validate category - fall back to 'other' if AI returns something unexpected
  return VALID_CATEGORIES.includes(raw) ? raw : 'other';
}

export async function analyzeSentiment(
  ai: Ai,
  content: string
): Promise<{ sentiment: string; score: number }> {
  const result = await ai.run('@cf/huggingface/distilbert-sst-2-int8', {
    text: content,
  });

  const top = ((result as unknown) as { label: string; score: number }[])[0];
  const score = top.label === 'POSITIVE' ? top.score : -top.score;
  const sentiment = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';

  return { sentiment, score };
}

const VALID_EFFORTS = ['low', 'medium', 'high'];

export async function estimateEffort(ai: Ai, content: string): Promise<string> {
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `Based on this customer feedback, estimate the engineering effort required to fix this issue. Consider: documentation fix = low, configuration change = low, minor code change = medium, new feature = medium, architecture change = high, third-party dependency = high.

Respond with only one word: low, medium, or high`,
      },
      { role: 'user', content },
    ],
  });

  const raw = ((result as unknown) as { response: string }).response.trim().toLowerCase();
  return VALID_EFFORTS.includes(raw) ? raw : 'medium';
}

export async function generateEmbedding(ai: Ai, content: string): Promise<number[]> {
  const result = await ai.run('@cf/baai/bge-base-en-v1.5', {
    text: [content],
  });

  return ((result as unknown) as { data: number[][] }).data[0];
}

export async function generateClusterTitle(ai: Ai, complaints: string[]): Promise<string> {
  const sample = complaints.slice(0, 5).map((c, i) => `${i + 1}. ${c}`).join('\n');
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `You are summarizing a cluster of similar customer complaints. Generate a short title (5-7 words) that describes the common theme.

Respond with ONLY the title, nothing else. No quotes, no punctuation at the end.`,
      },
      { role: 'user', content: `Complaints:\n${sample}` },
    ],
  });

  const raw = ((result as unknown) as { response: string }).response.trim();
  return raw.replace(/^["']|["']$/g, '').slice(0, 80);
}

export async function generateClusterSummary(ai: Ai, complaints: string[]): Promise<string> {
  const sample = complaints.slice(0, 8).map((c, i) => `${i + 1}. ${c}`).join('\n');
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `You are summarizing a cluster of similar customer complaints. Write a concise 1-2 sentence summary describing the core issue and its impact.

Respond with ONLY the summary, nothing else.`,
      },
      { role: 'user', content: `Complaints:\n${sample}` },
    ],
  });

  return ((result as unknown) as { response: string }).response.trim().slice(0, 300);
}

export async function generateSolution(ai: Ai, category: string, complaints: string[]): Promise<string> {
  const sample = complaints.slice(0, 5).map((c, i) => `${i + 1}. ${c}`).join('\n');
  const result = await ai.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
    messages: [
      {
        role: 'system',
        content: `Based on these customer complaints about ${category}, suggest a concrete solution in 2-3 sentences. Be specific and actionable. Include what team would likely own this (e.g., engineering, docs, support, product).

Respond with ONLY the solution, nothing else.`,
      },
      { role: 'user', content: `Complaints:\n${sample}` },
    ],
  });

  return ((result as unknown) as { response: string }).response.trim().slice(0, 500);
}
