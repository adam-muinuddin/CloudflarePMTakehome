CREATE TABLE IF NOT EXISTS feedback (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    source_url TEXT,
    content TEXT NOT NULL,
    category TEXT,
    sentiment TEXT,
    sentiment_score REAL,
    engagement_count INTEGER DEFAULT 0,
    is_paying_customer BOOLEAN DEFAULT 0,
    credibility_score REAL,
    priority_score REAL,
    effort_score TEXT DEFAULT 'medium',
    impact_score INTEGER DEFAULT 1,
    cluster_id TEXT,
    created_at TEXT NOT NULL,
    processed_at TEXT,
    status TEXT DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_sentiment ON feedback(sentiment);
CREATE INDEX IF NOT EXISTS idx_source ON feedback(source);
CREATE INDEX IF NOT EXISTS idx_priority ON feedback(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_created ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cluster_id ON feedback(cluster_id);

CREATE TABLE IF NOT EXISTS clusters (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    suggested_solution TEXT,
    category TEXT NOT NULL,
    sentiment_avg REAL,
    credibility_avg REAL,
    priority_score REAL,
    effort_score TEXT,
    impact_score INTEGER,
    created_at TEXT,
    updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_cluster_priority ON clusters(priority_score DESC);
