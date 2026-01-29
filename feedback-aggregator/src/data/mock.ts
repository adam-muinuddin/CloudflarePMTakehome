import type { MockFeedback } from '../types';

export const mockFeedback: MockFeedback[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 1: CUSTOMER SUPPORT ISSUES (~30 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support tickets about support (meta, but real) --
  {
    source: 'support',
    content: 'We have been waiting 47 days for a response on ticket #58291. Our enterprise account manager has gone completely silent. We are paying $5,000/month and cannot get anyone to acknowledge our issue with DNS propagation failures.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-03T09:15:00Z',
  },
  {
    source: 'support',
    content: 'Escalated a critical WAF misconfiguration to your Trust and Safety team 3 weeks ago. Zero response. Our legitimate API traffic is being blocked and we are losing revenue every day. Ticket #61204.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-05T14:30:00Z',
  },
  {
    source: 'support',
    content: 'Our account manager left Cloudflare two months ago and nobody has been assigned as a replacement. We have no escalation path for our enterprise contract issues. This is unacceptable for a $15k/year account.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-08T11:00:00Z',
  },
  {
    source: 'support',
    content: 'Support response times have gone from 4 hours to 4 days over the past quarter. We are seriously evaluating moving to Fastly. Please assign someone to our account immediately.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-12T08:45:00Z',
  },

  // -- Discord about support --
  {
    source: 'discord',
    content: 'Has anyone actually gotten a response from Cloudflare support recently? I submitted a ticket 3 weeks ago about my Workers deployment failing and it\'s still "open" with no reply.',
    engagement_count: 34,
    is_paying_customer: false,
    created_at: '2026-01-04T16:20:00Z',
  },
  {
    source: 'discord',
    content: 'The community Discord is literally the only support channel that works. Cloudflare support tickets go into a black hole. I\'ve had 4 tickets in the past 6 months and only 1 got a response.',
    engagement_count: 56,
    is_paying_customer: false,
    created_at: '2026-01-07T10:30:00Z',
  },
  {
    source: 'discord',
    content: 'Pro tip: if you need actual support from Cloudflare, your best bet is posting on the community forum and hoping a Cloudflare employee sees it. The official support channel is useless.',
    engagement_count: 89,
    is_paying_customer: false,
    created_at: '2026-01-10T13:15:00Z',
  },
  {
    source: 'discord',
    content: 'Spent $20/month on Pro plan partly for "priority email support" and my ticket has been unanswered for 2 weeks. What exactly am I paying for?',
    engagement_count: 42,
    is_paying_customer: false,
    created_at: '2026-01-14T09:00:00Z',
  },
  {
    source: 'discord',
    content: 'Enterprise customer here - even our dedicated support channel has degraded significantly. Used to get responses in hours, now it takes days. Something has changed internally.',
    engagement_count: 67,
    is_paying_customer: false,
    created_at: '2026-01-18T15:45:00Z',
  },
  {
    source: 'discord',
    content: 'I tried chatting with the AI support bot and it gave me completely wrong instructions for configuring page rules. Then it told me to contact support. Circular.',
    engagement_count: 28,
    is_paying_customer: false,
    created_at: '2026-01-22T11:30:00Z',
  },

  // -- Twitter about support --
  {
    source: 'twitter',
    content: '@CloudflareDev 50 days waiting for a response on my support ticket. FIFTY DAYS. And you want me to upgrade to enterprise for "better support"? Hard pass.',
    engagement_count: 1247,
    is_paying_customer: false,
    created_at: '2026-01-06T12:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare support is non-existent for free/pro users. They want you to use community forums where other customers try to help each other. That\'s not support, that\'s outsourcing.',
    engagement_count: 892,
    is_paying_customer: false,
    created_at: '2026-01-11T14:20:00Z',
  },
  {
    source: 'twitter',
    content: 'We\'re an enterprise Cloudflare customer paying mid-five figures annually. Our support experience has been abysmal for the past 2 months. Seriously considering alternatives.',
    engagement_count: 2341,
    is_paying_customer: false,
    created_at: '2026-01-16T09:30:00Z',
  },
  {
    source: 'twitter',
    content: 'The @Cloudflare support chatbot is worse than useless - it actively gives wrong advice. Asked about R2 pricing and it told me everything was free. Got charged $40.',
    engagement_count: 534,
    is_paying_customer: false,
    created_at: '2026-01-20T16:15:00Z',
  },

  // -- GitHub about support --
  {
    source: 'github',
    content: 'Issue reported 6 weeks ago with detailed reproduction steps. No response from any Cloudflare team member. Other community members have confirmed the bug. Is anyone home?',
    engagement_count: 31,
    is_paying_customer: false,
    created_at: '2026-01-09T08:00:00Z',
  },
  {
    source: 'github',
    content: 'Wrangler CLI issue affecting all Windows users reported 3 months ago. 45 thumbs up, multiple reproduction reports. Still no official response or fix. The open source community has a fix ready but no one from CF will review the PR.',
    engagement_count: 45,
    is_paying_customer: false,
    created_at: '2026-01-13T10:30:00Z',
  },
  {
    source: 'github',
    content: 'This is the third critical D1 bug I\'ve reported this month. Previous two are still open with no response. Are the D1 team even looking at GitHub issues?',
    engagement_count: 22,
    is_paying_customer: true,
    created_at: '2026-01-17T14:00:00Z',
  },

  // -- Forum about support --
  {
    source: 'forum',
    content: 'PSA: If you need Cloudflare support as a free user, your only real option is this forum. The official support ticketing system will not respond to non-paying accounts. Save yourself the frustration.',
    engagement_count: 156,
    is_paying_customer: false,
    created_at: '2026-01-02T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'I\'ve been a Pro customer for 2 years. Support quality has fallen off a cliff in the last 6 months. Average response time has gone from same-day to 1-2 weeks. Is Cloudflare cutting support staff?',
    engagement_count: 89,
    is_paying_customer: false,
    created_at: '2026-01-15T13:45:00Z',
  },
  {
    source: 'forum',
    content: 'Thread: "How to actually get Cloudflare support to respond" - Step 1: Be an enterprise customer. Step 2: Threaten to leave. Step 3: Tweet about it publicly. That\'s the current state of CF support.',
    engagement_count: 234,
    is_paying_customer: false,
    created_at: '2026-01-19T09:30:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 2: CAPTCHA / HUMAN VERIFICATION FRUSTRATIONS (~28 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Discord about CAPTCHA --
  {
    source: 'discord',
    content: 'My users are complaining about constant "Verify you are human" popups. They\'re on residential IPs, not VPNs, not bots. Something is wrong with the challenge detection.',
    engagement_count: 45,
    is_paying_customer: false,
    created_at: '2026-01-03T14:00:00Z',
  },
  {
    source: 'discord',
    content: 'The Turnstile widget keeps failing silently on Safari. Users click "Verify" and nothing happens. No error, no feedback, just stuck. My form submission rates dropped 30%.',
    engagement_count: 38,
    is_paying_customer: false,
    created_at: '2026-01-06T11:15:00Z',
  },
  {
    source: 'discord',
    content: 'Anyone else\'s users getting stuck in infinite verification loops? They complete the challenge, page reloads, asks them to verify again. Repeat forever.',
    engagement_count: 72,
    is_paying_customer: false,
    created_at: '2026-01-09T16:30:00Z',
  },
  {
    source: 'discord',
    content: 'I use a VPN for privacy and literally cannot access half the internet because Cloudflare challenges me on every single page load. This is discrimination against privacy-conscious users.',
    engagement_count: 93,
    is_paying_customer: false,
    created_at: '2026-01-12T10:00:00Z',
  },
  {
    source: 'discord',
    content: 'The verification challenge timed out while I was writing a long forum post. Lost 30 minutes of work. The challenge should not expire while someone is actively using the page.',
    engagement_count: 51,
    is_paying_customer: false,
    created_at: '2026-01-15T14:45:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare\'s "managed challenge" is supposed to be invisible but my analytics show 15% of visitors are getting challenged. That\'s not invisible, that\'s broken.',
    engagement_count: 33,
    is_paying_customer: false,
    created_at: '2026-01-18T08:20:00Z',
  },
  {
    source: 'discord',
    content: 'Turnstile integration was supposed to replace reCAPTCHA but it\'s causing more problems. The widget doesn\'t render half the time on mobile browsers.',
    engagement_count: 27,
    is_paying_customer: false,
    created_at: '2026-01-21T12:10:00Z',
  },
  {
    source: 'discord',
    content: 'Users from certain countries (especially those with shared IP ranges) are getting challenged on every request. We\'re losing international customers because of this.',
    engagement_count: 61,
    is_paying_customer: false,
    created_at: '2026-01-24T15:30:00Z',
  },

  // -- Twitter about CAPTCHA --
  {
    source: 'twitter',
    content: 'I\'ve done 47 "verify you are human" challenges today just trying to browse the internet normally. @Cloudflare you are ruining the web for VPN users.',
    engagement_count: 3456,
    is_paying_customer: false,
    created_at: '2026-01-04T13:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Lost a 2000-word comment because Cloudflare\'s verification timed out while I was writing it. The verification loop ate my work. Absolutely infuriating.',
    engagement_count: 1823,
    is_paying_customer: false,
    created_at: '2026-01-08T17:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare: "Verify you are human" Me: *completes challenge* Cloudflare: "Verify you are human" Me: *completes again* Cloudflare: "Verify you are human" INFINITE LOOP',
    engagement_count: 8721,
    is_paying_customer: false,
    created_at: '2026-01-11T11:45:00Z',
  },
  {
    source: 'twitter',
    content: 'My elderly parents can\'t access their bank\'s website because Cloudflare keeps asking them to verify they\'re human. They don\'t understand what\'s happening and think they\'ve been hacked.',
    engagement_count: 4521,
    is_paying_customer: false,
    created_at: '2026-01-14T09:15:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare\'s Turnstile is supposed to be "privacy-preserving" but it blocks Tor users entirely. So much for privacy.',
    engagement_count: 2134,
    is_paying_customer: false,
    created_at: '2026-01-17T14:00:00Z',
  },

  // -- GitHub about CAPTCHA --
  {
    source: 'github',
    content: 'Turnstile widget fails to render when Content-Security-Policy header is set. No documentation on required CSP directives. Had to disable our CSP just to use Turnstile, which defeats the purpose of security.',
    engagement_count: 28,
    is_paying_customer: false,
    created_at: '2026-01-05T08:30:00Z',
  },
  {
    source: 'github',
    content: 'Bug: Turnstile invisible mode fires the callback with an expired token ~5% of the time. Server-side verification fails and users see a blank error page. No retry mechanism built in.',
    engagement_count: 19,
    is_paying_customer: false,
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    source: 'github',
    content: 'Managed Challenge is incompatible with single-page applications. When the challenge page is served, it replaces the entire SPA and the user loses all client-side state. Need an API-based challenge flow.',
    engagement_count: 42,
    is_paying_customer: true,
    created_at: '2026-01-13T14:20:00Z',
  },
  {
    source: 'github',
    content: 'Turnstile React component causes hydration mismatch in Next.js 14 with App Router. The widget renders differently on server vs client. Needs an official Next.js integration.',
    engagement_count: 35,
    is_paying_customer: false,
    created_at: '2026-01-19T09:00:00Z',
  },

  // -- Support about CAPTCHA --
  {
    source: 'support',
    content: 'Our e-commerce checkout page is showing Cloudflare challenges to 20% of customers. We have lost an estimated $50,000 in sales this month. We need this resolved immediately or we will have to bypass Cloudflare entirely.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-07T08:00:00Z',
  },
  {
    source: 'support',
    content: 'Managed challenges are being served to our mobile app users via the API. The challenge page breaks our native app completely. We need a way to skip challenges for authenticated API requests.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-16T11:30:00Z',
  },

  // -- Forum about CAPTCHA --
  {
    source: 'forum',
    content: 'Guide: How to reduce false positive challenges on your Cloudflare-protected site. TL;DR: You can\'t really. The "Security Level" setting is too coarse and the firewall rules don\'t give enough control over challenge behavior.',
    engagement_count: 178,
    is_paying_customer: false,
    created_at: '2026-01-08T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'Is there any way to whitelist VPN IP ranges from Cloudflare challenges? My site serves a privacy-focused audience and we\'re losing 25% of our traffic to verification challenges.',
    engagement_count: 67,
    is_paying_customer: false,
    created_at: '2026-01-20T13:15:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 3: BILLING CONFUSION (~28 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about billing --
  {
    source: 'support',
    content: 'I was charged $9.90 for an R2 "Infrequent Access" bucket that I created and deleted within 5 minutes as a test. There is no free tier warning anywhere in the dashboard. I want a refund.',
    engagement_count: 0,
    is_paying_customer: false,
    created_at: '2026-01-02T10:30:00Z',
  },
  {
    source: 'support',
    content: 'My R2 bucket was blocked for an outstanding balance of $0.72. No email warning, no notification in the dashboard. I only found out when my production application started returning 403 errors.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-06T09:00:00Z',
  },
  {
    source: 'support',
    content: 'Our Workers bill jumped from $5/month to $280/month after a code change increased subrequest count. The pricing page doesn\'t make it clear that subrequests are billed separately from requests.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-10T14:15:00Z',
  },
  {
    source: 'support',
    content: 'We are being charged for Workers AI usage despite the documentation stating it\'s included in the Workers Paid plan. Our bill shows $340 in AI inference charges. Please clarify and adjust.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-14T08:30:00Z',
  },
  {
    source: 'support',
    content: 'The pricing calculator on your website shows one price, but our actual bill is 3x higher. The calculator doesn\'t account for Class A vs Class B operations on R2. This is misleading.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-18T11:00:00Z',
  },
  {
    source: 'support',
    content: 'We accidentally left a Workers cron trigger running over the weekend. $800 in charges for a test worker. There are no spending limits or alerts available. We need billing alerts ASAP.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-22T09:45:00Z',
  },

  // -- Discord about billing --
  {
    source: 'discord',
    content: 'PSA: R2 Infrequent Access buckets have NO free tier. I just got charged $9.90 for a bucket I created to test the feature. The UI doesn\'t warn you at all.',
    engagement_count: 145,
    is_paying_customer: false,
    created_at: '2026-01-03T11:00:00Z',
  },
  {
    source: 'discord',
    content: 'Can someone explain the Workers pricing? I thought 10 million requests were included. Turns out subrequests, KV reads, and D1 queries are all billed separately. The "included" number is basically meaningless.',
    engagement_count: 78,
    is_paying_customer: false,
    created_at: '2026-01-07T14:30:00Z',
  },
  {
    source: 'discord',
    content: 'My Workers AI bill went from $0 to $200 overnight. Apparently the free neurons quota changed and nobody was notified. Check your bills people.',
    engagement_count: 112,
    is_paying_customer: false,
    created_at: '2026-01-11T09:20:00Z',
  },
  {
    source: 'discord',
    content: 'Just found out Cloudflare charges for R2 Class A operations (writes) at 10x the rate of Class B (reads). A migration script that writes a lot of small files will cost way more than you expect.',
    engagement_count: 63,
    is_paying_customer: false,
    created_at: '2026-01-15T16:00:00Z',
  },
  {
    source: 'discord',
    content: 'There\'s no way to set a spending limit on Workers or R2. If your code has a bug that makes extra requests, you just get a surprise bill. AWS at least has billing alarms.',
    engagement_count: 91,
    is_paying_customer: false,
    created_at: '2026-01-19T10:45:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare pricing page says R2 egress is free, but they don\'t mention that the operations to READ from R2 still cost money. Free egress ≠ free reads. Very misleading marketing.',
    engagement_count: 84,
    is_paying_customer: false,
    created_at: '2026-01-23T13:30:00Z',
  },
  {
    source: 'discord',
    content: 'I got a $45 bill for D1 and I only have 50MB of data. Turns out each row read counts as an operation and my analytics dashboard was doing full table scans. The billing model punishes inefficient queries.',
    engagement_count: 55,
    is_paying_customer: false,
    created_at: '2026-01-25T08:15:00Z',
  },

  // -- Twitter about billing --
  {
    source: 'twitter',
    content: 'Our @Cloudflare bill went from $200/mo to $800/mo after enabling Workers AI. The pricing page says "included" but that\'s extremely misleading. There are hidden neuron limits.',
    engagement_count: 3124,
    is_paying_customer: false,
    created_at: '2026-01-04T15:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare blocked my R2 bucket over a $0.72 outstanding charge. No warning email. No grace period. Just broke my production app. Great customer experience. 🙄',
    engagement_count: 4567,
    is_paying_customer: false,
    created_at: '2026-01-09T12:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Created an R2 bucket, uploaded one test file, deleted it 2 minutes later. Got charged $9.90. Cloudflare\'s "free egress" marketing conveniently leaves out the minimum charges.',
    engagement_count: 2891,
    is_paying_customer: false,
    created_at: '2026-01-13T10:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare should be legally required to show pricing BEFORE you create resources. The R2 bucket creation flow has zero cost warnings. Found out about the $9.90 minimum from my credit card statement.',
    engagement_count: 1756,
    is_paying_customer: false,
    created_at: '2026-01-21T11:45:00Z',
  },
  {
    source: 'twitter',
    content: 'Just realized Cloudflare Workers charges for CPU time, not wall clock time. Sounds good until you realize async operations still count. My await fetch() calls are costing me money.',
    engagement_count: 987,
    is_paying_customer: false,
    created_at: '2026-01-26T14:00:00Z',
  },

  // -- GitHub about billing --
  {
    source: 'github',
    content: 'Feature request: Add billing alerts and spending limits to the Cloudflare dashboard. Currently there is no way to cap spending on Workers, R2, or AI. Users are getting surprise bills with no recourse.',
    engagement_count: 87,
    is_paying_customer: false,
    created_at: '2026-01-05T09:00:00Z',
  },
  {
    source: 'github',
    content: 'The wrangler CLI should show estimated costs before deploying Workers with paid bindings. Currently it deploys silently and users only find out about costs when the bill arrives.',
    engagement_count: 34,
    is_paying_customer: false,
    created_at: '2026-01-12T11:30:00Z',
  },
  {
    source: 'github',
    content: 'Bug: The Cloudflare dashboard usage page shows Workers requests but not the associated costs in real-time. You have to wait until the invoice to see actual charges. Need real-time cost tracking.',
    engagement_count: 41,
    is_paying_customer: true,
    created_at: '2026-01-20T08:00:00Z',
  },

  // -- Forum about billing --
  {
    source: 'forum',
    content: 'Comprehensive guide: Understanding Cloudflare R2 pricing (because the official docs are confusing). Short version: "free egress" doesn\'t mean "free." You still pay for operations, storage, and IA access.',
    engagement_count: 312,
    is_paying_customer: false,
    created_at: '2026-01-06T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'Poll: How many people have been surprised by their Cloudflare bill? Based on responses, 73% of R2 users didn\'t understand the pricing model before getting their first invoice.',
    engagement_count: 198,
    is_paying_customer: false,
    created_at: '2026-01-16T14:00:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 4: FALSE POSITIVES / BLOCKING LEGITIMATE TRAFFIC (~25 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about false positives --
  {
    source: 'support',
    content: 'Cloudflare\'s Bot Fight Mode is blocking our payment processor\'s webhook callbacks. We are missing 40% of payment confirmations. Disabling the feature entirely is our only option but that leaves us unprotected.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-02T08:00:00Z',
  },
  {
    source: 'support',
    content: 'WAF rule ID 100043 is blocking legitimate PHP AJAX requests from our WordPress admin panel. The rule matches on the POST body format which is standard WordPress. Cannot whitelist without disabling the entire rule group.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-08T13:00:00Z',
  },
  {
    source: 'support',
    content: 'Bot Management is flagging Google\'s AdsBot as a threat and blocking it. This is killing our ad revenue because Google can\'t crawl our landing pages. The "verified bots" allowlist doesn\'t seem to work.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-14T09:30:00Z',
  },
  {
    source: 'support',
    content: 'Under Attack Mode was automatically enabled on our site during a false alarm and we lost 6 hours of legitimate traffic before we noticed. There were no alerts sent. We need better notification controls.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-20T07:15:00Z',
  },

  // -- Discord about false positives --
  {
    source: 'discord',
    content: 'Cloudflare is blocking Stripe webhooks for my SaaS app. I\'m getting 403s on every callback. Had to add a firewall rule to skip all Stripe IPs but that defeats the purpose of having a WAF.',
    engagement_count: 47,
    is_paying_customer: false,
    created_at: '2026-01-03T15:00:00Z',
  },
  {
    source: 'discord',
    content: 'My users in Southeast Asia are being blocked at much higher rates than US/EU users. The bot detection seems biased toward IP ranges from developing countries. Not cool.',
    engagement_count: 82,
    is_paying_customer: false,
    created_at: '2026-01-07T11:30:00Z',
  },
  {
    source: 'discord',
    content: 'Bot Fight Mode blocks headless Chrome browsers, which means our automated testing pipeline fails every time. We had to proxy all our test traffic around Cloudflare.',
    engagement_count: 39,
    is_paying_customer: false,
    created_at: '2026-01-10T14:00:00Z',
  },
  {
    source: 'discord',
    content: 'The WAF managed rules are way too aggressive on the default "High" sensitivity. Half our API clients are getting blocked because they send JSON payloads that trigger SQL injection rules.',
    engagement_count: 56,
    is_paying_customer: false,
    created_at: '2026-01-13T09:45:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare is blocking legitimate crawlers from Slack, Discord, and Telegram when they try to generate link previews. Our shared links show as broken in all messaging apps.',
    engagement_count: 73,
    is_paying_customer: false,
    created_at: '2026-01-16T16:20:00Z',
  },
  {
    source: 'discord',
    content: 'We enable Bot Fight Mode and lose 15% of legitimate traffic. We disable it and get DDoS\'d. There\'s no middle ground because the detection is too coarse.',
    engagement_count: 44,
    is_paying_customer: false,
    created_at: '2026-01-19T12:00:00Z',
  },
  {
    source: 'discord',
    content: 'The Security Events log shows Cloudflare blocked a request but gives no useful information about WHY. Just "managed rule." Which rule? What did it match? How do I fix it?',
    engagement_count: 35,
    is_paying_customer: false,
    created_at: '2026-01-23T10:30:00Z',
  },

  // -- Twitter about false positives --
  {
    source: 'twitter',
    content: 'Cloudflare just blocked me from accessing my own credit union website. I am literally trying to check my bank account and @Cloudflare says I\'m a bot. I\'m not a bot, I\'m broke.',
    engagement_count: 12456,
    is_paying_customer: false,
    created_at: '2026-01-05T18:00:00Z',
  },
  {
    source: 'twitter',
    content: '@Cloudflare your bot protection blocked Googlebot from indexing my site for 3 weeks before I noticed. My organic traffic dropped 60%. "Protection" that destroys your SEO isn\'t protection.',
    engagement_count: 3211,
    is_paying_customer: false,
    created_at: '2026-01-12T10:15:00Z',
  },
  {
    source: 'twitter',
    content: 'My API returns 403 to legitimate paying customers because Cloudflare thinks their requests are "suspicious." I\'m paying for Pro plan security that actively drives away my own customers.',
    engagement_count: 1567,
    is_paying_customer: false,
    created_at: '2026-01-18T15:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare WAF blocked a $200k enterprise deal because the client\'s corporate proxy triggered bot detection during the demo. Can\'t make this stuff up.',
    engagement_count: 5432,
    is_paying_customer: false,
    created_at: '2026-01-24T12:00:00Z',
  },

  // -- GitHub about false positives --
  {
    source: 'github',
    content: 'Bug: Bot Fight Mode blocks Python requests library with default user-agent even when the request is from a legitimate API integration. The detection relies too heavily on user-agent string matching.',
    engagement_count: 52,
    is_paying_customer: false,
    created_at: '2026-01-04T09:00:00Z',
  },
  {
    source: 'github',
    content: 'Feature request: Allow WAF rules to be tested in "log only" mode before enforcement. Currently the only way to test a rule is to deploy it and hope it doesn\'t block legitimate traffic.',
    engagement_count: 68,
    is_paying_customer: true,
    created_at: '2026-01-11T11:00:00Z',
  },
  {
    source: 'github',
    content: 'The managed WAF ruleset has no granularity. You can\'t disable individual rules within a rule group - it\'s all or nothing. This forces users to choose between over-blocking and under-blocking.',
    engagement_count: 43,
    is_paying_customer: false,
    created_at: '2026-01-17T13:30:00Z',
  },
  {
    source: 'github',
    content: 'Super Bot Fight Mode incorrectly classifies requests from AWS Lambda@Edge as bots. These are legitimate backend services. Need IP-range-based exemptions for cloud provider IPs.',
    engagement_count: 29,
    is_paying_customer: false,
    created_at: '2026-01-22T08:45:00Z',
  },

  // -- Forum about false positives --
  {
    source: 'forum',
    content: 'After enabling Cloudflare on our WordPress site, the admin AJAX endpoint stopped working. Every wp-admin request triggers a WAF rule. The fix requires creating 5 different exceptions. Not user-friendly at all.',
    engagement_count: 143,
    is_paying_customer: false,
    created_at: '2026-01-09T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'Cloudflare\'s default security settings are dangerously aggressive for small business websites. I spent 2 days figuring out why my contact form stopped working - it was the WAF blocking form submissions.',
    engagement_count: 98,
    is_paying_customer: false,
    created_at: '2026-01-21T14:30:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 5: SERVICE OUTAGES AND RELIABILITY (~25 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about outages --
  {
    source: 'support',
    content: 'During the January 15 incident, our Workers returned 500 errors for 45 minutes. Our SLA guarantees 99.99% uptime and this single incident puts us below threshold. We expect SLA credits applied to our account.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-15T18:00:00Z',
  },
  {
    source: 'support',
    content: 'D1 database was completely unreachable for 2 hours on January 20. No incident posted on the status page for the first 90 minutes. We had no way to know if it was our fault or Cloudflare\'s.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-20T16:00:00Z',
  },
  {
    source: 'support',
    content: 'The maintenance window on January 22 was supposed to be 15 minutes but lasted 3 hours. Our API was returning 503s the entire time. No advance notice of the extended downtime.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-22T14:00:00Z',
  },
  {
    source: 'support',
    content: 'IPv4 prefix withdrawal on January 18 took our Business plan website offline for 75 minutes. The postmortem says it was a "maintenance error." We need guarantees this won\'t happen again.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-18T20:00:00Z',
  },

  // -- Discord about outages --
  {
    source: 'discord',
    content: 'Is Workers down right now? All my deployed workers are returning 500 errors. Status page says everything is operational. Classic.',
    engagement_count: 156,
    is_paying_customer: false,
    created_at: '2026-01-04T22:00:00Z',
  },
  {
    source: 'discord',
    content: 'D1 has been intermittently failing for the past 3 days. Queries either timeout or return partial results. No acknowledgment on the status page. Anyone else seeing this?',
    engagement_count: 89,
    is_paying_customer: false,
    created_at: '2026-01-08T10:30:00Z',
  },
  {
    source: 'discord',
    content: 'Third Vectorize outage this month. My semantic search feature has been unreliable for weeks. Starting to think Vectorize isn\'t production-ready.',
    engagement_count: 43,
    is_paying_customer: false,
    created_at: '2026-01-12T14:15:00Z',
  },
  {
    source: 'discord',
    content: 'Workers AI inference latency spiked from 150ms to 8 seconds for the past hour. My app is completely unusable. No incident on the status page.',
    engagement_count: 72,
    is_paying_customer: false,
    created_at: '2026-01-16T09:30:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare status page is useless. Every time there\'s a real outage, the status page shows green. Only after users complain on Twitter does it get updated to "investigating."',
    engagement_count: 134,
    is_paying_customer: false,
    created_at: '2026-01-19T17:00:00Z',
  },
  {
    source: 'discord',
    content: 'KV writes have been failing silently for the past 2 hours. The write operations return success but the data isn\'t persisted. This is the worst kind of bug - it doesn\'t even tell you it\'s broken.',
    engagement_count: 67,
    is_paying_customer: false,
    created_at: '2026-01-23T11:30:00Z',
  },

  // -- Twitter about outages --
  {
    source: 'twitter',
    content: 'Half the internet is down because Cloudflare is having issues again. How is it that one company can take down so many websites? Single point of failure for the web.',
    engagement_count: 15678,
    is_paying_customer: false,
    created_at: '2026-01-05T14:00:00Z',
  },
  {
    source: 'twitter',
    content: '@Cloudflare status page shows all green but my Workers have been erroring for 30 minutes. Your monitoring is as reliable as your uptime apparently.',
    engagement_count: 2345,
    is_paying_customer: false,
    created_at: '2026-01-10T08:45:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare Workers just had a 3x increase in latency for 30 minutes affecting 2% of all HTTP requests. That\'s millions of failed requests. "Minutes of downtime" doesn\'t capture the real impact.',
    engagement_count: 4532,
    is_paying_customer: false,
    created_at: '2026-01-15T16:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Every time Cloudflare has an outage, the postmortem says "we\'ve learned from this and improved our processes." Yet here we are again. Third incident this month.',
    engagement_count: 3211,
    is_paying_customer: false,
    created_at: '2026-01-22T11:00:00Z',
  },

  // -- GitHub about outages --
  {
    source: 'github',
    content: 'D1 connections are being silently dropped under load. No error returned, the query just hangs forever. This has been happening intermittently for 3 weeks. Makes D1 unsuitable for production workloads.',
    engagement_count: 38,
    is_paying_customer: true,
    created_at: '2026-01-06T09:30:00Z',
  },
  {
    source: 'github',
    content: 'Vectorize queries return empty results during index rebuilds. There\'s no documentation on when rebuilds happen or how long they take. Production applications need consistency guarantees.',
    engagement_count: 24,
    is_paying_customer: false,
    created_at: '2026-01-13T11:00:00Z',
  },
  {
    source: 'github',
    content: 'Workers KV eventually consistent reads are returning stale data for up to 60 seconds, which is 6x the documented "up to 10 seconds" propagation delay. This breaks our session management.',
    engagement_count: 33,
    is_paying_customer: false,
    created_at: '2026-01-19T14:30:00Z',
  },
  {
    source: 'github',
    content: 'Workers cold start times have regressed significantly in the past month. P99 cold start went from 50ms to 300ms. This is breaking our latency SLAs with customers.',
    engagement_count: 57,
    is_paying_customer: true,
    created_at: '2026-01-25T08:00:00Z',
  },

  // -- Forum about outages --
  {
    source: 'forum',
    content: 'Timeline of Cloudflare outages in January 2026: Jan 5 (Workers), Jan 10 (D1), Jan 15 (global latency spike), Jan 18 (IPv4 prefix withdrawal), Jan 22 (extended maintenance). That\'s 5 incidents in one month.',
    engagement_count: 245,
    is_paying_customer: false,
    created_at: '2026-01-23T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'Cloudflare\'s status page needs to be run by a third party. Having Cloudflare monitor its own uptime is like grading your own homework. They consistently underreport incidents.',
    engagement_count: 189,
    is_paying_customer: false,
    created_at: '2026-01-26T09:30:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 6: ONBOARDING / EMAIL VERIFICATION (~22 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about onboarding --
  {
    source: 'support',
    content: 'I cannot complete email verification because the verification emails are not arriving. I have checked spam folders on 3 different email providers. Cannot use any Cloudflare services without verification.',
    engagement_count: 0,
    is_paying_customer: false,
    created_at: '2026-01-03T09:00:00Z',
  },
  {
    source: 'support',
    content: 'Caught in a Catch-22: Cannot purchase Workers Paid plan because my account isn\'t verified. Cannot verify because verification emails don\'t arrive. Cannot get support because I\'m not a paying customer.',
    engagement_count: 0,
    is_paying_customer: false,
    created_at: '2026-01-09T11:30:00Z',
  },
  {
    source: 'support',
    content: 'The domain transfer process is incredibly confusing. The UI says "transfer initiated" but nothing happens for 5 days. No progress indicator, no status emails, no estimated timeline.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-15T14:00:00Z',
  },

  // -- Discord about onboarding --
  {
    source: 'discord',
    content: 'Spent 4 hours trying to set up my first Worker. The documentation assumes you already know what you\'re doing. There\'s no "I\'ve never used serverless before" guide.',
    engagement_count: 52,
    is_paying_customer: false,
    created_at: '2026-01-02T16:00:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare email verification email took 6 hours to arrive. By then the verification link had expired. Requested a new one, same thing. Took me 3 days just to verify my account.',
    engagement_count: 34,
    is_paying_customer: false,
    created_at: '2026-01-06T10:00:00Z',
  },
  {
    source: 'discord',
    content: 'The DNS setup wizard is confusing for people who don\'t know what CNAME vs A records are. If you\'re targeting small businesses, you need a simpler onboarding flow.',
    engagement_count: 29,
    is_paying_customer: false,
    created_at: '2026-01-10T13:30:00Z',
  },
  {
    source: 'discord',
    content: 'Wrangler login flow opens a browser tab that often fails to redirect back. Getting authenticated to deploy my first Worker took way longer than it should.',
    engagement_count: 18,
    is_paying_customer: false,
    created_at: '2026-01-14T11:00:00Z',
  },
  {
    source: 'discord',
    content: 'The difference between Workers, Pages, and Durable Objects is not clear at all to new users. I just want to deploy a Next.js app. Which product do I use?',
    engagement_count: 76,
    is_paying_customer: false,
    created_at: '2026-01-18T09:15:00Z',
  },
  {
    source: 'discord',
    content: 'Created a Cloudflare account to try R2 for object storage. The setup requires adding a credit card before you can create any bucket, even on the free tier. No trial without payment info.',
    engagement_count: 41,
    is_paying_customer: false,
    created_at: '2026-01-21T15:30:00Z',
  },
  {
    source: 'discord',
    content: 'New to Cloudflare. Where do I even start? The dashboard has 30+ tabs and I just wanted to add DDoS protection to my small blog. The onboarding doesn\'t help you navigate the complexity.',
    engagement_count: 63,
    is_paying_customer: false,
    created_at: '2026-01-24T10:45:00Z',
  },

  // -- Twitter about onboarding --
  {
    source: 'twitter',
    content: 'Trying to sign up for @Cloudflare and the verification email never arrives. Tried 3 different email addresses. Stuck before I can even start using the service.',
    engagement_count: 456,
    is_paying_customer: false,
    created_at: '2026-01-04T14:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare onboarding: "Add your domain" but doesn\'t explain that you need to change your nameservers, which means 24-48 hours of potential downtime if you mess it up. No warning.',
    engagement_count: 1234,
    is_paying_customer: false,
    created_at: '2026-01-11T09:00:00Z',
  },
  {
    source: 'twitter',
    content: 'I want to use Cloudflare Workers but the docs assume you know TypeScript, npm, wrangler, and Workers concepts. The learning curve is a cliff, not a curve.',
    engagement_count: 2345,
    is_paying_customer: false,
    created_at: '2026-01-17T16:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare\'s email verification system is ironic - a company that handles email routing can\'t reliably send verification emails to new customers.',
    engagement_count: 3456,
    is_paying_customer: false,
    created_at: '2026-01-23T11:30:00Z',
  },

  // -- GitHub about onboarding --
  {
    source: 'github',
    content: 'The wrangler init command generates a project with deprecated configuration format. New users following the quickstart guide get deprecation warnings immediately. Not a great first impression.',
    engagement_count: 15,
    is_paying_customer: false,
    created_at: '2026-01-07T09:30:00Z',
  },
  {
    source: 'github',
    content: 'Documentation for D1 setup is spread across 4 different pages with conflicting instructions. The quickstart says one thing, the migration guide says another, and the CLI help says something else.',
    engagement_count: 23,
    is_paying_customer: false,
    created_at: '2026-01-13T10:00:00Z',
  },
  {
    source: 'github',
    content: 'The worker-configuration.d.ts generated by `wrangler types` is 400KB+. This makes IDE autocomplete slow and bloats the project. Need a lighter type generation option.',
    engagement_count: 17,
    is_paying_customer: false,
    created_at: '2026-01-20T14:30:00Z',
  },

  // -- Forum about onboarding --
  {
    source: 'forum',
    content: 'Wrote a beginner\'s guide to Cloudflare because the official docs are terrible for newcomers. Covers the basics that Cloudflare assumes you already know: DNS, SSL, CDN concepts.',
    engagement_count: 456,
    is_paying_customer: false,
    created_at: '2026-01-05T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'FAQ: "Why am I not receiving Cloudflare verification emails?" Answer: Nobody knows. This is the most common question on this forum and there\'s still no official fix.',
    engagement_count: 234,
    is_paying_customer: false,
    created_at: '2026-01-14T09:00:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 7: SITE COMPATIBILITY ISSUES (~22 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about compatibility --
  {
    source: 'support',
    content: 'After enabling Cloudflare, our site\'s load time went from 4 seconds to 14 seconds. The "performance optimization" is actually making our site slower. Rocket Loader is breaking our JavaScript.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-03T10:00:00Z',
  },
  {
    source: 'support',
    content: 'Cloudflare\'s HTML minification is stripping essential whitespace from our email templates, breaking the layout. The minifier needs a way to exclude specific paths.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-10T13:00:00Z',
  },
  {
    source: 'support',
    content: 'Polish (image optimization) is converting our product images to WebP but the quality is noticeably worse than the originals. Customers are complaining about blurry product photos.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-17T09:30:00Z',
  },

  // -- Discord about compatibility --
  {
    source: 'discord',
    content: 'Enabling Cloudflare broke my site\'s header and footer. Turns out Rocket Loader was deferring a critical script that renders the navigation. Had to figure this out myself - no warning from Cloudflare.',
    engagement_count: 31,
    is_paying_customer: false,
    created_at: '2026-01-02T14:00:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare\'s Auto Minify is removing CSS that it thinks is unused but is actually loaded dynamically. My modals and dropdowns are completely unstyled now.',
    engagement_count: 24,
    is_paying_customer: false,
    created_at: '2026-01-05T11:30:00Z',
  },
  {
    source: 'discord',
    content: 'Workers serve responses with the wrong Content-Type header for some file extensions. My .mjs files are being served as application/octet-stream instead of application/javascript.',
    engagement_count: 17,
    is_paying_customer: false,
    created_at: '2026-01-08T09:00:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare\'s HTTP/2 Push feature is sending assets that the browser already has cached, wasting bandwidth. The priority hints are being ignored. Turning it off actually improved performance.',
    engagement_count: 22,
    is_paying_customer: false,
    created_at: '2026-01-11T16:00:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare is caching my API responses even though I set Cache-Control: no-store. The cdn-cache-control header is being ignored. My users are seeing stale data.',
    engagement_count: 48,
    is_paying_customer: false,
    created_at: '2026-01-14T13:15:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare edge is modifying my response headers. It strips my custom X-Request-ID header which our clients use for debugging. Can\'t find any setting to prevent this.',
    engagement_count: 19,
    is_paying_customer: false,
    created_at: '2026-01-17T10:30:00Z',
  },
  {
    source: 'discord',
    content: 'WebSocket connections through Cloudflare drop after exactly 100 seconds of inactivity even though my server sends pings every 30 seconds. The connection timeout is not configurable on free/pro plans.',
    engagement_count: 37,
    is_paying_customer: false,
    created_at: '2026-01-20T15:00:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare\'s Always Online feature is serving a cached version of my maintenance page instead of the actual site. Users think the site is still down even though it\'s been back up for hours.',
    engagement_count: 26,
    is_paying_customer: false,
    created_at: '2026-01-24T08:45:00Z',
  },

  // -- Twitter about compatibility --
  {
    source: 'twitter',
    content: 'Turned on Cloudflare for my WordPress site and the admin dashboard broke completely. The "one click setup" took me 3 days to debug. Should have just stayed with my bare VPS.',
    engagement_count: 567,
    is_paying_customer: false,
    created_at: '2026-01-06T11:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare\'s Rocket Loader: "Speed up your site by breaking half your JavaScript." Just disable it unless you enjoy debugging production issues.',
    engagement_count: 1234,
    is_paying_customer: false,
    created_at: '2026-01-13T14:30:00Z',
  },
  {
    source: 'twitter',
    content: 'My site was loading in 2 seconds before Cloudflare. After enabling their "performance" features, it takes 6 seconds. The optimization engine is pessimizing my site.',
    engagement_count: 2100,
    is_paying_customer: false,
    created_at: '2026-01-19T09:45:00Z',
  },

  // -- GitHub about compatibility --
  {
    source: 'github',
    content: 'Bug: Cloudflare Workers modify the response body when the worker doesn\'t explicitly pass through the body. Default pass-through should preserve the original response byte-for-byte.',
    engagement_count: 21,
    is_paying_customer: false,
    created_at: '2026-01-04T10:00:00Z',
  },
  {
    source: 'github',
    content: 'Pages Functions conflict with _headers file configuration. Custom headers set in _headers are overwritten by Pages Functions instead of being merged. This is not documented.',
    engagement_count: 14,
    is_paying_customer: false,
    created_at: '2026-01-09T14:30:00Z',
  },
  {
    source: 'github',
    content: 'Workers Sites incorrectly handles paths with encoded characters (e.g., %20, %C3%A9). Static files with spaces or unicode characters in filenames return 404.',
    engagement_count: 18,
    is_paying_customer: false,
    created_at: '2026-01-16T08:30:00Z',
  },
  {
    source: 'github',
    content: 'Bug: The Cloudflare dashboard CDN settings page shows conflicting caching behavior. Page Rules say one thing, Cache Rules say another, and the actual behavior matches neither.',
    engagement_count: 36,
    is_paying_customer: true,
    created_at: '2026-01-22T11:00:00Z',
  },

  // -- Forum about compatibility --
  {
    source: 'forum',
    content: 'Definitive list of Cloudflare features you should DISABLE for WordPress sites: Rocket Loader, Auto Minify, Email Obfuscation, and Automatic HTTPS Rewrites. They all break WordPress in different ways.',
    engagement_count: 567,
    is_paying_customer: false,
    created_at: '2026-01-07T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'The interaction between Page Rules, Cache Rules, Transform Rules, and WAF rules is impossible to reason about. Which one takes priority? The documentation contradicts itself.',
    engagement_count: 123,
    is_paying_customer: false,
    created_at: '2026-01-18T14:00:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CATEGORY 8: ABUSE HANDLING (~20 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- Support about abuse --
  {
    source: 'support',
    content: 'We have submitted 12 abuse reports about a phishing site impersonating our brand. The site is still behind Cloudflare after 6 weeks. Your abuse team is either overwhelmed or not acting on reports.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-04T09:00:00Z',
  },
  {
    source: 'support',
    content: 'A competitor is running a DDoS attack against our origin from behind a Cloudflare-proxied domain. We filed an abuse report 3 weeks ago. No response. The attack continues daily.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-12T08:00:00Z',
  },
  {
    source: 'support',
    content: 'Our brand\'s trademark is being used on a scam website hosted behind Cloudflare. Despite providing legal documentation and DMCA notices, the site remains active. We need escalation to your legal team.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-20T10:30:00Z',
  },

  // -- Discord about abuse --
  {
    source: 'discord',
    content: 'Cloudflare protects known scam sites because they pay for the service. Filed an abuse report about a crypto scam that stole $50k from users. Still online after 2 months behind CF.',
    engagement_count: 87,
    is_paying_customer: false,
    created_at: '2026-01-03T12:00:00Z',
  },
  {
    source: 'discord',
    content: 'My legitimate SaaS got flagged as "phishing" by Cloudflare and they suspended my account with no appeal process. Took 2 weeks to get it restored. Lost all my customers during that time.',
    engagement_count: 112,
    is_paying_customer: false,
    created_at: '2026-01-08T15:30:00Z',
  },
  {
    source: 'discord',
    content: 'The abuse reporting form is a joke. You fill it out, get a template response saying "we\'ve forwarded this to the site operator" and nothing happens. Cloudflare doesn\'t actually take action.',
    engagement_count: 65,
    is_paying_customer: false,
    created_at: '2026-01-13T10:00:00Z',
  },
  {
    source: 'discord',
    content: 'Cloudflare\'s position on abuse is frustrating. They say they\'re "just the CDN" and can\'t control content. But they can absolutely refuse to provide services to known malicious sites.',
    engagement_count: 94,
    is_paying_customer: false,
    created_at: '2026-01-18T14:00:00Z',
  },
  {
    source: 'discord',
    content: 'Someone is scraping our entire website from behind a Cloudflare proxy. We can see the Cloudflare IPs in our logs but can\'t identify the actual scraper. Abuse report filed, no response.',
    engagement_count: 38,
    is_paying_customer: false,
    created_at: '2026-01-23T11:30:00Z',
  },

  // -- Twitter about abuse --
  {
    source: 'twitter',
    content: '@Cloudflare is protecting a phishing site that stole my credit card info. Reported it 3 times. Still online. You\'re enabling cybercrime.',
    engagement_count: 5678,
    is_paying_customer: false,
    created_at: '2026-01-05T13:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare\'s abuse process: 1. Report phishing site 2. Get auto-reply "we forwarded to the operator" 3. Nothing happens 4. Repeat for months 5. Site still up. Great system.',
    engagement_count: 3456,
    is_paying_customer: false,
    created_at: '2026-01-10T16:30:00Z',
  },
  {
    source: 'twitter',
    content: 'My site was falsely flagged as malicious by Cloudflare and suspended without warning. No evidence provided. No appeal process. Just instant termination. How is this acceptable?',
    engagement_count: 7890,
    is_paying_customer: false,
    created_at: '2026-01-16T10:00:00Z',
  },
  {
    source: 'twitter',
    content: 'The irony of @Cloudflare: will protect actual scam websites for months, but will instantly suspend legitimate sites based on automated false positives. Priorities are backwards.',
    engagement_count: 4321,
    is_paying_customer: false,
    created_at: '2026-01-22T14:45:00Z',
  },

  // -- GitHub about abuse --
  {
    source: 'github',
    content: 'Feature request: Add a public API for reporting abuse to Cloudflare. The current web form is tedious for ISPs and security researchers who need to report hundreds of phishing sites behind CF.',
    engagement_count: 45,
    is_paying_customer: false,
    created_at: '2026-01-07T09:00:00Z',
  },
  {
    source: 'github',
    content: 'Cloudflare should publish transparency reports on abuse takedown requests: how many received, how many actioned, average response time. Currently it\'s a complete black box.',
    engagement_count: 62,
    is_paying_customer: false,
    created_at: '2026-01-15T14:00:00Z',
  },

  // -- Forum about abuse --
  {
    source: 'forum',
    content: 'Discussion: Should Cloudflare be held responsible for protecting sites that host illegal content? As a security professional, I think they need to do more than just forward abuse reports to site operators.',
    engagement_count: 345,
    is_paying_customer: false,
    created_at: '2026-01-06T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'My small business website was suspended by Cloudflare for "ToS violation" but they won\'t tell me what I violated. No warning, no specific reason, just terminated. Took 3 weeks and a lawyer to get reinstated.',
    engagement_count: 234,
    is_paying_customer: false,
    created_at: '2026-01-19T12:00:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL MIXED COMPLAINTS TO REACH 200 (~20 items)
  // ═══════════════════════════════════════════════════════════════════

  // -- More Discord --
  {
    source: 'discord',
    content: 'Pages deploy preview URLs are leaking our staging content to the public internet. Anyone with the URL can access preview deployments. There\'s no built-in access control.',
    engagement_count: 43,
    is_paying_customer: false,
    created_at: '2026-01-02T09:00:00Z',
  },
  {
    source: 'discord',
    content: 'Wrangler tail shows logs from other people\'s workers if you get the timing right. I\'m seeing request logs that aren\'t mine. This seems like a serious security issue.',
    engagement_count: 167,
    is_paying_customer: false,
    created_at: '2026-01-06T17:00:00Z',
  },
  {
    source: 'discord',
    content: 'The D1 export feature only exports 10,000 rows at a time. I have 2 million rows. No batch export, no streaming export. How am I supposed to back up my data?',
    engagement_count: 31,
    is_paying_customer: false,
    created_at: '2026-01-11T10:00:00Z',
  },
  {
    source: 'discord',
    content: 'Workers CPU time limit of 10ms on free plan is absurdly low. A simple JWT verification takes 5ms. You can\'t build anything meaningful without hitting the limit.',
    engagement_count: 88,
    is_paying_customer: false,
    created_at: '2026-01-16T14:30:00Z',
  },

  // -- More Twitter --
  {
    source: 'twitter',
    content: 'Cloudflare Pages is great until you need custom headers, redirects, or middleware. Then you discover you need Pages Functions which have completely different deployment limits. Why is this split?',
    engagement_count: 876,
    is_paying_customer: false,
    created_at: '2026-01-07T12:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Moved from Vercel to Cloudflare Pages and immediately regretted it. No preview comments, no deploy notifications, no team collaboration features. It\'s a deploy button and nothing else.',
    engagement_count: 2134,
    is_paying_customer: false,
    created_at: '2026-01-14T15:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare D1 is NOT a replacement for a real database. Max 10GB storage, no replication, no point-in-time recovery. Stop marketing it as "your production database."',
    engagement_count: 3456,
    is_paying_customer: false,
    created_at: '2026-01-21T10:00:00Z',
  },
  {
    source: 'twitter',
    content: 'Why does @Cloudflare make it so hard to cancel your plan? The downgrade button is hidden behind 3 menus and a confirmation page. Then it tries to upsell you on the way out.',
    engagement_count: 1567,
    is_paying_customer: false,
    created_at: '2026-01-25T13:30:00Z',
  },

  // -- More GitHub --
  {
    source: 'github',
    content: 'D1 has no point-in-time recovery or automated backups. A bad migration can destroy your production data with no rollback. This is the #1 blocker for adopting D1 in production.',
    engagement_count: 72,
    is_paying_customer: true,
    created_at: '2026-01-03T08:00:00Z',
  },
  {
    source: 'github',
    content: 'Workers 128MB memory limit is not enough for image processing workloads. The limit is documented nowhere prominently - you only find out when your Worker crashes with a cryptic error.',
    engagement_count: 39,
    is_paying_customer: false,
    created_at: '2026-01-10T09:30:00Z',
  },
  {
    source: 'github',
    content: 'Pages Functions have a different deployment size limit (1MB) than Workers (5MB). Same runtime, different limits. This forces architectural decisions based on deployment target rather than application needs.',
    engagement_count: 25,
    is_paying_customer: false,
    created_at: '2026-01-17T11:00:00Z',
  },
  {
    source: 'github',
    content: 'Wrangler local dev mode doesn\'t support Vectorize, Queues, or Hyperdrive. You can\'t test these features locally - you have to deploy to staging. This slows down development significantly.',
    engagement_count: 48,
    is_paying_customer: false,
    created_at: '2026-01-24T09:00:00Z',
  },

  // -- More Forum --
  {
    source: 'forum',
    content: 'Cloudflare\'s product naming is confusing. Workers, Pages, Functions, Durable Objects, Service Bindings, mTLS, Access, Tunnels... I just want to host a website. Which of these 15 products do I need?',
    engagement_count: 289,
    is_paying_customer: false,
    created_at: '2026-01-08T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'The migration from legacy Page Rules to the new rules engine (Cache Rules, Redirect Rules, etc.) is a nightmare. No automatic migration tool, and the new rules have different syntax and behavior.',
    engagement_count: 167,
    is_paying_customer: false,
    created_at: '2026-01-15T09:00:00Z',
  },

  // -- More Support --
  {
    source: 'support',
    content: 'Our Cloudflare Access policies stopped working after the January update. Employees are locked out of internal tools. We need immediate rollback or fix for our SSO integration.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-11T07:30:00Z',
  },
  {
    source: 'support',
    content: 'The Cloudflare API rate limit of 1,200 requests per 5 minutes is too low for our infrastructure-as-code deployment pipeline. We need higher limits or batch API endpoints.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-19T12:00:00Z',
  },
  {
    source: 'support',
    content: 'Argo Smart Routing is adding $300/month to our bill but our latency improvement is only 5ms. The cost-benefit ratio doesn\'t justify the expense. Is there a way to optimize which routes use Argo?',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-25T15:00:00Z',
  },
  {
    source: 'support',
    content: 'We migrated 50 domains to Cloudflare Registrar and the bulk transfer process lost DNS records for 8 of them. No backup was offered before the transfer. We had 4 hours of downtime for those domains.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-27T09:00:00Z',
  },

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL ITEMS TO REACH 200 (22 more)
  // ═══════════════════════════════════════════════════════════════════

  {
    source: 'discord',
    content: 'Cloudflare Email Routing silently drops emails larger than 25MB with no bounce notification. The sender thinks it was delivered, the recipient never gets it. This has caused real problems.',
    engagement_count: 54,
    is_paying_customer: false,
    created_at: '2026-01-02T11:00:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare dashboard loads incredibly slowly. Navigating between pages takes 3-5 seconds. For a CDN company, the irony of having a slow dashboard is painful.',
    engagement_count: 76,
    is_paying_customer: false,
    created_at: '2026-01-04T09:30:00Z',
  },
  {
    source: 'discord',
    content: 'Durable Objects have no observability. No way to see active instances, memory usage, or websocket connections. Debugging production DO issues is like flying blind.',
    engagement_count: 41,
    is_paying_customer: false,
    created_at: '2026-01-09T13:00:00Z',
  },
  {
    source: 'discord',
    content: 'The Cloudflare Tunnel documentation is outdated and references deprecated cloudflared commands. New users are following guides that no longer work.',
    engagement_count: 33,
    is_paying_customer: false,
    created_at: '2026-01-13T08:45:00Z',
  },
  {
    source: 'discord',
    content: 'Queues has a 128KB message size limit which is way too small for most real-world use cases. SQS allows 256KB and has extended to 2GB with S3. Please increase the limit.',
    engagement_count: 29,
    is_paying_customer: false,
    created_at: '2026-01-17T15:20:00Z',
  },
  {
    source: 'discord',
    content: 'Hyperdrive connection pooling randomly returns "connection reset" errors under moderate load. The pool seems to close connections aggressively without proper retry.',
    engagement_count: 22,
    is_paying_customer: false,
    created_at: '2026-01-21T10:15:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare Zero Trust is enterprise-grade complexity at SMB pricing. Spent 2 days setting up basic SSO for a 10-person team. The configuration UI is overwhelming.',
    engagement_count: 789,
    is_paying_customer: false,
    created_at: '2026-01-03T13:45:00Z',
  },
  {
    source: 'twitter',
    content: 'If Cloudflare goes down, half the internet goes with it. Maybe we shouldn\'t have a single company sitting in front of 20% of all websites. Just a thought.',
    engagement_count: 14567,
    is_paying_customer: false,
    created_at: '2026-01-08T08:00:00Z',
  },
  {
    source: 'twitter',
    content: 'The Cloudflare partner program gives agencies zero tools to manage multiple client accounts. No unified dashboard, no bulk operations, no white-labeling. It\'s not a real partner program.',
    engagement_count: 654,
    is_paying_customer: false,
    created_at: '2026-01-15T11:30:00Z',
  },
  {
    source: 'twitter',
    content: 'Cloudflare Images is half-baked. No batch upload, no folder organization, terrible search. For a product that costs money per image stored, the management tools are embarrassingly basic.',
    engagement_count: 1098,
    is_paying_customer: false,
    created_at: '2026-01-20T14:00:00Z',
  },
  {
    source: 'github',
    content: 'The Workers runtime silently truncates console.log output at 1KB. No warning, no error, just cuts off. Debugging large objects is impossible without an external logging service.',
    engagement_count: 31,
    is_paying_customer: false,
    created_at: '2026-01-02T15:00:00Z',
  },
  {
    source: 'github',
    content: 'R2 multipart uploads cannot be resumed after a network interruption. The entire upload must be restarted from scratch. For large files in unreliable networks, this makes R2 unusable.',
    engagement_count: 27,
    is_paying_customer: false,
    created_at: '2026-01-08T11:00:00Z',
  },
  {
    source: 'github',
    content: 'Feature request: Add Workers Analytics Engine support for custom metrics. The built-in analytics only show request counts and errors. We need custom counters and histograms.',
    engagement_count: 44,
    is_paying_customer: true,
    created_at: '2026-01-14T09:00:00Z',
  },
  {
    source: 'github',
    content: 'Durable Objects alarms fire with up to 30 seconds of jitter. For time-sensitive operations like billing cycle transitions, this level of imprecision is not acceptable.',
    engagement_count: 19,
    is_paying_customer: true,
    created_at: '2026-01-19T10:30:00Z',
  },
  {
    source: 'github',
    content: 'The miniflare (local Workers simulator) behaves differently from the production runtime in multiple subtle ways. Tests pass locally but fail in production. The environments need to be unified.',
    engagement_count: 55,
    is_paying_customer: false,
    created_at: '2026-01-24T14:00:00Z',
  },
  {
    source: 'support',
    content: 'We need SOC 2 Type II compliance documentation for Workers and D1. Our enterprise clients require this before we can use Cloudflare in our stack. Is this available?',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-06T14:00:00Z',
  },
  {
    source: 'support',
    content: 'Our CDN cache hit ratio dropped from 85% to 40% after the January 10 update. Nothing changed on our end. Cache invalidation seems broken for our zone.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-13T08:30:00Z',
  },
  {
    source: 'support',
    content: 'Magic Transit BGP session keeps flapping every 6 hours. Each flap causes 2-3 minutes of packet loss for our entire network. This is a critical infrastructure issue.',
    engagement_count: 0,
    is_paying_customer: true,
    created_at: '2026-01-21T07:00:00Z',
  },
  {
    source: 'forum',
    content: 'Comparison thread: Cloudflare Workers vs AWS Lambda vs Vercel Edge Functions. Workers wins on cold start time but loses badly on ecosystem, tooling, and documentation quality.',
    engagement_count: 378,
    is_paying_customer: false,
    created_at: '2026-01-04T10:00:00Z',
  },
  {
    source: 'forum',
    content: 'The Cloudflare community MVPs do more support work than actual Cloudflare employees on this forum. At what point does a company owe its community volunteers something in return?',
    engagement_count: 445,
    is_paying_customer: false,
    created_at: '2026-01-12T09:00:00Z',
  },
  {
    source: 'forum',
    content: 'Cloudflare\'s rate limiting feature counts by IP address, which breaks behind shared NAT or corporate proxies. Hundreds of legitimate users can share one IP. Need rate limiting by API key or session.',
    engagement_count: 134,
    is_paying_customer: false,
    created_at: '2026-01-17T14:30:00Z',
  },
  {
    source: 'forum',
    content: 'The SSL/TLS configuration options are confusing. Full, Full (Strict), Flexible, Off - the names don\'t explain what they do and choosing wrong can either break your site or create a security vulnerability.',
    engagement_count: 267,
    is_paying_customer: false,
    created_at: '2026-01-24T11:00:00Z',
  },
];
