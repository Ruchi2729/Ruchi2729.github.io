export const capabilities = [
  ['Frontend Engineering', 'Professional experience', 'Server-driven UI, web performance, and Core Web Vitals.'],
  ['Backend Engineering', 'Professional experience', 'Scalable services and notifications infrastructure.'],
  ['Full-Stack Product Engineering', 'Professional experience', 'End-to-end ownership across product surfaces and services.'],
  ['Distributed Systems', 'Professional experience', 'Event-driven architectures and notification workflows.'],
  ['Growth and SEO Engineering', 'Professional experience', 'User acquisition, content discovery, and search visibility.'],
  ['AI and LLM Engineering', 'Professional and independent work', 'On-call automation, collaborative articles, and exploration of agentic workflows and MCP.'],
  ['Machine Learning', 'Independent project plans', 'Anomaly detection and churn prediction in Sentinel and GrowthIQ.'],
  ['Big Data Engineering', 'Independent project plans', 'Streaming and batch analytics in GrowthIQ.'],
  ['Reliability and Observability', 'Professional experience', 'Production reliability, on-call workflows, and observability.'],
  ['System Design and Architecture', 'Professional experience', 'Frontend architecture, distributed services, and migration design.'],
  ['Technical Leadership', 'Professional experience', 'End-to-end technical and product ownership.'],
]

export const cases = [
  ['notifications-platform', 'Notifications Platform', 'Communications infrastructure', 'How can a distributed platform deliver member notifications reliably?', 'Event producer|Notification processing|Delivery surface', 'Where should delivery guarantees and retry behavior be enforced?'],
  ['server-driven-ui', 'Server-Driven UI Migration', 'Frontend architecture', 'How can a product move presentation decisions to the server while preserving client behavior?', 'Server configuration|Client renderer|Member interface', 'How do client compatibility and rollout speed shape the migration?'],
  ['notification-settings', 'Notification Settings Rearchitecture', 'Full-stack engineering', 'How can members manage notification preferences across product surfaces?', 'Settings interface|Preference service|Delivery decisions', 'Where should preference state be validated and applied?'],
  ['notification-replay', 'Notification Replay Tool', 'Developer productivity', 'How can an engineer replay a notification workflow during investigation?', 'Event selection|Replay request|Execution feedback', 'How should access, auditability, and unintended side effects be handled?'],
  ['on-call-automation', 'AI-Powered On-call Automation', 'Applied AI', 'Where can AI reduce repetitive work during on-call investigations?', 'Incident context|AI-assisted analysis|Engineer review', 'Which decisions require human review and supporting evidence?'],
  ['growth-acquisition', 'Growth and Acquisition Engineering', 'Product growth', 'How can acquisition surfaces help visitors find relevant content and take a meaningful next step?', 'Discovery|Landing experience|Acquisition funnel', 'How can teams measure funnel changes while preserving the visitor experience?'],
  ['seo-discovery', 'SEO and Content Discovery', 'Search engineering', 'How can search engines and visitors discover relevant content?', 'Content inventory|Indexable pages|Search discovery', 'How should index coverage be balanced with content quality?'],
  ['collaborative-articles', 'AI Collaborative Articles', 'AI product engineering', 'How can AI-assisted content and member contributions come together in one product?', 'AI-assisted topic|Contributor input|Published article', 'Where does contributor expertise add the most value?'],
  ['web-performance', 'Web Performance and Core Web Vitals', 'Web performance', 'How can web experiences load quickly, respond promptly, and stay visually stable?', 'Page load|Interaction|Field measurement', 'Which fixes improve the experience across user cohorts?'],
].map(([id, title, area, problem, flow, tradeoff]) => ({ id, title, area, problem, flow: flow.split('|'), tradeoff }))

export const lab = [
  {
    id: 'sentinel', title: 'Sentinel', area: 'AI-powered incident intelligence',
    description: 'Correlate operational events and guide on-call engineers through incident investigations.',
    flow: ['Event ingestion', 'Kafka and anomaly detection', 'Incident correlation', 'AI investigation and review'],
    features: ['Real-time ingestion and Kafka processing', 'ML anomaly detection and incident correlation', 'MCP investigation tools and streaming LLM responses', 'Observability dashboards and human-reviewed remediation'],
    stack: 'Kafka, Python, PostgreSQL, React and MCP',
    model: 'Event → Signal → Incident → Investigation',
    api: 'POST /events · GET /incidents/{id} · GET /investigations/{id}/stream',
    tradeoff: 'Partition by service to scale ingestion. Use event keys for deduplication and require approval before any remediation.',
    testing: 'Replay synthetic incidents with duplicate and late events. Measure ingestion lag, correlation delay, and time to first response token.',
    roadmap: 'Ingestion and event replay → anomaly detection and correlation → investigation interface and MCP integration.',
    samples: [['Checkout latency increased', 'A rise in downstream timeout events warrants a review of dependency timing.'], ['Queue lag increased', 'Compare consumer throughput and event arrival rates before changing capacity.']],
  },
  {
    id: 'growthiq', title: 'GrowthIQ', area: 'Predictive product analytics',
    description: 'Turn behavioral events into funnel, retention, and experimentation insights.',
    flow: ['Behavioral events', 'Stream and batch processing', 'Analytics and ML', 'Analyst dashboard'],
    features: ['Real-time behavioral event ingestion', 'Batch and stream processing', 'Segmentation, funnels, and churn prediction', 'A/B test analytics and AI-generated business insights'],
    stack: 'Kafka, Python, DuckDB, PostgreSQL and React',
    model: 'Behavioral event → Session → Cohort → Experiment assignment',
    api: 'POST /events · GET /funnels/{id} · GET /experiments/{id}/results',
    tradeoff: 'Use streaming for freshness and batch recomputation for corrections. Keep personal identifiers out of synthetic datasets and restrict access to event-level data.',
    testing: 'Validate event ordering, attribution, experiment assignment, and temporal model splits. Measure data freshness and dashboard query latency.',
    roadmap: 'Event schema and ingestion → cohorts and funnels → churn models and experiment reporting.',
    samples: [['Signup funnel', 'In this synthetic scenario, the largest drop is between signup and activation.'], ['Experiment review', 'In this synthetic scenario, exposure counts warrant an assignment-ratio check.']],
  },
  {
    id: 'cortex', title: 'Cortex', area: 'Enterprise knowledge intelligence',
    description: 'Help teams find answers across documents and trace each answer to its sources.',
    flow: ['Document import', 'Chunking and indexing', 'Hybrid retrieval', 'Cited answer stream'],
    features: ['Asynchronous document ingestion, chunking, and embeddings', 'Vector and hybrid search with RAG', 'Agent orchestration, tool calling, and cited streaming answers', 'Conversation history, role-based access, and hallucination monitoring'],
    stack: 'Python, PostgreSQL with pgvector, a job queue, and React',
    model: 'Document → Chunk → Citation · Conversation → Message',
    api: 'POST /documents · GET /ingestion/{id} · POST /conversations/{id}/messages',
    tradeoff: 'Filter retrieval by access permissions before ranking. Preserve document versions so citations can be traced after reindexing.',
    testing: 'Test access isolation, citation integrity, and ambiguous queries. Track retrieval recall, groundedness, and time to first token.',
    roadmap: 'Document ingestion and permissions → hybrid retrieval and citations → tool use and evaluation.',
    samples: [['Where is the rollout policy?', 'Synthetic source: Release Handbook, section 3, “Staged rollouts.”'], ['Who can access the handbook?', 'Synthetic source: Access Policy, section 2, “Engineering readers.”']],
  },
].map((project) => ({ ...project, status: 'Planned' }))

export const articles = [
  {
    id: 'notification-replay', title: 'Designing a safe notification replay workflow', topic: 'Distributed systems · Reliability',
    description: 'How idempotency, audit trails, and dry runs shape a replay tool.',
    sections: [
      ['Define the unit of replay', 'Choose whether the operation reprocesses an original event or reruns a specific delivery attempt. An event can fan out to several channels, so the choice determines the scope of downstream effects.'],
      ['Separate inspection from execution', 'Start with a dry run that shows the selected event, destination, and likely effects. Require explicit authorization for execution, and give each approved run a stable identifier so retries can be deduplicated.'],
      ['Measure the workflow', 'Track replay counts, duplicate suppression, and denied actions. Exercise replay against a sink populated with synthetic events before testing any production delivery path.'],
    ],
  },
  {
    id: 'rag-evaluation', title: 'Evaluating retrieval before evaluating answers', topic: 'LLMs · Retrieval-augmented generation',
    description: 'A practical way to isolate retrieval, citation, and answer-quality failures.',
    sections: [
      ['Start with a small evidence set', 'Write questions, mark the passages that actually support each answer, and include questions the corpus cannot answer. Keep document versions and access labels with each expected passage.'],
      ['Score retrieval independently', 'Measure whether relevant passages appear in the first few retrieved results. Check permission boundaries and separate ranking failures from indexing failures.'],
      ['Check claims against citations', 'Break each answer into claims and verify that each cited passage supports the associated claim. Track abstention separately so the system can improve at recognizing missing evidence.'],
    ],
  },
]

export const caseEvidence = {
  'notifications-platform': ['Owned production reliability for distributed communications.', 'Used throughput metrics, consumer lag, and event tracing to diagnose Kafka-backed pipelines.', 'Coordinated mitigation, verified recovery, and added regression coverage for permanent fixes.'],
  'server-driven-ui': ['Led the end-to-end migration of Notifications from a legacy stack to server-driven UI.', 'Worked across Java and GraphQL mid-tier APIs and Kotlin UI definitions.', 'Modernized notification presentation across web, iOS, and Android.'],
  'notification-settings': ['Led a full-stack rearchitecture and built reusable UI libraries.', 'Worked with Product, Design, and infrastructure teams to align member controls, distributed enforcement, and backfill requirements.', 'Enabled clearer notification explanations, direct settings navigation, and simpler preference management.'],
  'notification-replay': ['Designed and built a tool for engineers and product partners to reproduce personalized scenarios on test accounts.', 'Used test-account replay to remove the dependency on waiting for live triggers.', 'Supported debugging and validation across in-app, push, and email.'],
  'growth-acquisition': ['Built guest app-activation experiences.', 'Worked across guest-facing discovery and activation surfaces.', 'The résumé reports a 1.2% increase in guest-to-member conversion.'],
  'seo-discovery': ['Built Content Hub capabilities and evaluated relevance and ranking models for SEO crosslinking.', 'Worked on public-profile experiments balancing discovery, engagement, and content protection.', 'The résumé reports a 0.8% engagement improvement from SEO crosslinking.'],
  'collaborative-articles': ['Built AI collaborative-article capabilities as part of Growth engineering.', 'Worked on discoverable content surfaces.', 'Expanded discoverable content to support organic-search acquisition.'],
}

export const timeline = [
  ['LinkedIn', 'Senior Full-Stack Software Engineer', 'May 2022 – Present', 'Notifications platform, growth, acquisition, and applied AI.'],
  ['Citizens Bank', 'Senior Software Engineer', 'Nov 2019 – May 2022', 'Serverless onboarding, access control, and infrastructure automation.'],
  ['Asurion', 'Software Engineer II', 'Jul 2018 – Nov 2019', 'Serverless APIs, React retail applications, and deployment automation.'],
  ['Zappix', 'Full Stack Developer', 'Mar 2018 – Jul 2018', 'Visual IVR and healthcare analytics.'],
  ['Agero', 'Software Engineer Intern', 'Jan 2017 – Sep 2017', 'IVR integrations, data pipelines, and observability.'],
  ['Synechron Technologies', 'Associate Software Engineer', 'Dec 2013 – Dec 2015', 'Test automation and engineering dashboards.'],
]
