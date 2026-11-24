export const capabilities = [
  ['Frontend Engineering', 'Professional experience', 'React, JavaScript, TypeScript, server-driven UI, and web performance.'],
  ['Backend Engineering', 'Professional experience', 'Java, Kotlin, API design, and scalable notification services.'],
  ['Full-Stack Product Engineering', 'Professional experience', 'End-to-end ownership across product surfaces and services.'],
  ['Distributed Systems', 'Professional experience', 'Event-driven architecture, Kafka pipelines, and notification workflows.'],
  ['Growth and SEO Engineering', 'Professional experience', 'User acquisition, content discovery, and search visibility.'],
  ['AI and LLM Engineering', 'Professional experience and active learning', 'AI collaborative articles at LinkedIn. LLM applications, agentic workflows, and MCP are areas of independent exploration.'],
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

export const articles = [
  {
    id: 'notification-replay', title: 'Designing a safe notification replay workflow', topic: 'Distributed systems · Reliability',
    description: 'How idempotency, audit trails, and dry runs shape a replay tool.',
  },
  {
    id: 'rag-evaluation', title: 'Evaluating retrieval before evaluating answers', topic: 'LLMs · Retrieval-augmented generation',
    description: 'A practical way to isolate retrieval, citation, and answer-quality failures.',
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
