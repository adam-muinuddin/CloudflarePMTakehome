const SOURCE_WEIGHTS: Record<string, number> = {
  support: 0.9,
  github: 0.7,
  discord: 0.5,
  forum: 0.5,
  twitter: 0.3,
};

export function calculateCredibility(
  source: string,
  engagementCount: number,
  isPayingCustomer: boolean
): number {
  let score = SOURCE_WEIGHTS[source] || 0.3;

  // Engagement boost (logarithmic to prevent viral outliers from dominating)
  if (engagementCount > 0) {
    const engagementBoost = Math.min(0.3, Math.log10(engagementCount) * 0.1);
    score += engagementBoost;
  }

  // Paying customer boost
  if (isPayingCustomer) {
    score += 0.2;
  }

  return Math.min(1.0, score);
}

export function calculatePriority(
  sentimentScore: number,
  credibilityScore: number
): number {
  // Convert sentiment to negativity (more negative = higher value)
  const negativity = (1 - sentimentScore) / 2;
  return negativity * credibilityScore;
}
