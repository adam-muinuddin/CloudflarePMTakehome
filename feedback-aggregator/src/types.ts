export interface MockFeedback {
  source: 'discord' | 'github' | 'twitter' | 'support' | 'forum';
  content: string;
  engagement_count: number;
  is_paying_customer: boolean;
  created_at: string;
}

export interface FeedbackRow {
  id: string;
  source: string;
  source_url: string | null;
  content: string;
  category: string;
  sentiment: string;
  sentiment_score: number;
  engagement_count: number;
  is_paying_customer: number;
  credibility_score: number;
  priority_score: number;
  effort_score: string;
  impact_score: number;
  cluster_id: string | null;
  created_at: string;
  processed_at: string | null;
  status: string;
}

export interface ClusterRow {
  id: string;
  title: string;
  summary: string;
  suggested_solution: string | null;
  category: string;
  sentiment_avg: number;
  credibility_avg: number;
  priority_score: number;
  effort_score: string;
  impact_score: number;
  created_at: string;
  updated_at: string;
}
