export const SAMPLE_CATEGORIES = [{ _id: 'cat-1', name: 'Software Development', slug: 'software-development', description: 'Practical tutorials and architecture guides.' }];
const bld = (t, d, desc) => `## ${t}\n${desc}\n\n### 1. Architectural Foundations of ${d}\nAdopting rigorous patterns is essential for scalable systems.\n\n### 2. Production Code Implementation\n\`\`\`javascript\nexport async function executeOperation(payload) { return { success: true }; }\n\`\`\`\n\n### 3. Best Practices\n- Zero-Downtime Resilience\n- Telemetry & Tracing`;

const T_IMG = {
  Microservices: ['photo-1558494949-ef010cbdcc31', 'photo-1544197150-b99a580bb7a8', 'photo-1551288049-bebda4e38f71'],
  'Clean Code': ['photo-1516259762381-22954d7d3ad2', 'photo-1461749280684-dccba630e2f6', 'photo-1517694712202-14dd9538aa97'],
  TypeScript: ['photo-1555066931-4365d14bab8c', 'photo-1526374965328-7f61d4dc18c5', 'photo-1507238691740-187a5b1d37b8'],
  Docker: ['photo-1605745341112-85968b19335b', 'photo-1586528116311-ad8dd3c8310d', 'photo-1525547719571-a2d4ac8945e2'],
  Testing: ['photo-1504639725590-34d0984388bd', 'photo-1518770660439-4636190af475', 'photo-1451187580459-43490279c0fa'],
  Database: ['photo-1544383835-bda2bc66a55d', 'photo-1563986768609-322da13575f3', 'photo-1542831371-29b0f74f9713'],
  Architecture: ['photo-1629654297299-c8506221ca97', 'photo-1515879218367-8466d910aaa4'],
  Security: ['photo-1563089145-599997674d42', 'photo-1510511459019-5dda7724fd87'],
  DevOps: ['photo-1618401471353-b98afee0b2eb', 'photo-1667372393119-3d4c48d07fc9'],
  Frontend: ['photo-1633356122544-f134324a6cee', 'photo-1507238691740-187a5b1d37b8']
};
const getImg = (dom, i = 0) => `https://images.unsplash.com/${(T_IMG[dom] || T_IMG.Microservices)[i % (T_IMG[dom] || T_IMG.Microservices).length]}?auto=format&fit=crop&w=1200&q=80`;

const mk = (id, title, slug, desc, domain, author, st = 'published', v = 1400, imgUrl) => ({
  _id: id, title, slug, shortDescription: desc, domain, fullContent: bld(title, domain, desc), featuredImage: imgUrl,
  categoryId: SAMPLE_CATEGORIES[0], authorId: { _id: `u-${id}`, name: author, email: `${author.toLowerCase().replace(/\s+/g, '.')}@devsphere.com`, websiteUrl: 'https://github.com', socialMediaId: `@${author.toLowerCase().replace(/\s+/g, '_')}` },
  publishedDate: new Date(), readingTimeMinutes: 5, viewsCount: v, featuredStatus: id === 'art-1', status: st, createdAt: new Date(), updatedAt: new Date()
});

const pub = [
  ['art-1', 'Architecting Scalable Microservices with Node.js', 'architecting-scalable-microservices-with-nodejs', 'Resilient decoupled services.', 'Microservices', 'Aarav Sharma', 1420],
  ['art-2', 'Event-Driven Microservices Architecture with Apache Kafka', 'event-driven-microservices-architecture-with-apache-kafka', 'Decoupled event streams.', 'Microservices', 'Priya Patel', 1820],
  ['art-3', 'API Gateway Patterns in Distributed Microservices Ecosystems', 'api-gateway-patterns-in-distributed-microservices-ecosystems', 'Centralized routing & auth.', 'Microservices', 'Rohan Verma', 2150],
  ['art-4', 'Clean Code Principles Every Beginner Developer Should Know', 'clean-code-principles-every-beginner-developer-should-know', 'DRY, KISS, and meaningful names.', 'Clean Code', 'Neha Gupta', 2310],
  ['art-5', 'Refactoring Legacy Codebases with Clean Code Practices', 'refactoring-legacy-codebases-with-clean-code-practices', 'Safe iterative refactoring.', 'Clean Code', 'Aarav Sharma', 1670],
  ['art-6', 'Mastering SOLID Design Principles for Clean Code Architecture', 'mastering-solid-design-principles-for-clean-code-architecture', 'SOLID engineering guide.', 'Clean Code', 'DevSphere Administrator', 2940],
  ['art-7', 'Advanced TypeScript Generics and Conditional Types Explained', 'advanced-typescript-generics-and-conditional-types-explained', 'Type-safe flexible libraries.', 'TypeScript', 'Priya Patel', 1980],
  ['art-8', 'Strict TypeScript Configuration Guide for Production Apps', 'strict-typescript-configuration-guide-for-production-apps', 'Optimizing compiler flags.', 'TypeScript', 'Aarav Sharma', 1450],
  ['art-9', 'Design Patterns: Implementing the Observer Pattern in TypeScript', 'design-patterns-implementing-the-observer-pattern-in-typescript', 'Type-safe EventEmitter.', 'TypeScript', 'Priya Patel', 2200],
  ['art-10', 'Mastering Docker Containers for Full-Stack Applications', 'mastering-docker-containers-for-full-stack-applications', 'Multi-stage container builds.', 'Docker', 'Ananya Iyer', 3120],
  ['art-11', 'Optimizing Docker Image Size with Multi-Stage Alpine Builds', 'optimizing-docker-image-size-with-multi-stage-alpine-builds', 'Distroless & minimal baselines.', 'Docker', 'Vikram Malhotra', 1780],
  ['art-12', 'Docker Compose for Multi-Container Local Development Environments', 'docker-compose-for-multi-container-local-development-environments', 'Orchestrate interconnected devs.', 'Docker', 'DevSphere Administrator', 2650],
  ['art-13', 'Test-Driven Development (TDD) with Modern Testing Frameworks', 'test-driven-development-tdd-with-modern-testing-frameworks', 'Bulletproof component testing.', 'Testing', 'DevSphere Administrator', 1890],
  ['art-14', 'End-to-End Automation Testing Strategies with Playwright', 'end-to-end-automation-testing-strategies-with-playwright', 'Automate cross-browser flows.', 'Testing', 'Neha Gupta', 2100],
  ['art-15', 'Integration Testing Best Practices for REST and GraphQL APIs', 'integration-testing-best-practices-for-rest-and-graphql-apis', 'Mock and assert HTTP contracts.', 'Testing', 'Aarav Sharma', 1640],
  ['art-16', 'Demystifying SQL vs NoSQL: Choosing the Right Database for Your App', 'demystifying-sql-vs-nosql-choosing-the-right-database-for-your-app', 'Relational vs document stores.', 'Database', 'Rohan Verma', 2780],
  ['art-17', 'Database Indexing Strategies for High-Performance Queries', 'database-indexing-strategies-for-high-performance-queries', 'Compound indexes & explain plans.', 'Database', 'Rohan Verma', 1950],
  ['art-18', 'Managing Database Migrations and ACID Transactions in Production', 'managing-database-migrations-and-acid-transactions-in-production', 'Zero-downtime migrations.', 'Database', 'Priya Patel', 2410]
];

const pen = [
  ['art-p-1', 'Deep Dive into Linux Kernel System Calls for Web Developers', 'deep-dive-into-linux-kernel-system-calls-for-web-developers', 'epoll & non-blocking IO.', 'Architecture', 'Aarav Sharma'],
  ['art-p-2', 'Web Security Hardening: Securing Microservices from XSS and CSRF', 'web-security-hardening-securing-microservices-from-xss-and-csrf', 'Security strategies for APIs.', 'Security', 'Vikram Malhotra'],
  ['art-p-3', 'Git and GitHub Workflow: A Step-by-Step Production Guide', 'git-and-github-workflow-step-by-step-production-guide', 'Branching & pull requests.', 'DevOps', 'Ananya Iyer'],
  ['art-p-4', 'Building High-Throughput Caching with Redis In-Memory Store', 'building-high-throughput-caching-with-redis-in-memory-store', 'TTL and eviction policies.', 'Architecture', 'DevSphere Administrator'],
  ['art-p-5', 'GraphQL Schema Federation: Composing Distributed Subgraphs', 'graphql-schema-federation-composing-distributed-subgraphs', 'Unifying multiple domains.', 'Architecture', 'Aarav Sharma'],
  ['art-p-6', 'Kubernetes Custom Resource Definitions (CRDs) and Operator Pattern', 'kubernetes-custom-resource-definitions-crds-and-operator-pattern', 'Declarative K8s controllers.', 'DevOps', 'Ananya Iyer'],
  ['art-p-7', 'Rust Memory Safety and Concurrency Models for High-Scale Backend Systems', 'rust-memory-safety-and-concurrency-models-for-high-scale-backend-systems', 'Zero-cost abstractions.', 'Architecture', 'Rohan Verma'],
  ['art-p-8', 'Implementing Distributed Locks and Rate Limiting with Redis Redlock', 'implementing-distributed-locks-and-rate-limiting-with-redis-redlock', 'Race-condition-free locks.', 'Database', 'Rohan Verma'],
  ['art-p-9', 'Defensive API Design: Zero-Trust Input Validation with Zod and TypeScript', 'defensive-api-design-zero-trust-input-validation-with-zod-and-typescript', 'Strict schema boundaries.', 'TypeScript', 'Priya Patel'],
  ['art-p-10', 'Architecting Multi-Tenant Microservices with Tenant Isolation', 'architecting-multi-tenant-microservices-with-tenant-isolation', 'Schema-per-tenant isolation.', 'Microservices', 'Aarav Sharma']
];

const dra = [
  ['art-d-1', 'Distributed Tracing and Observability with OpenTelemetry', 'distributed-tracing-and-observability-with-opentelemetry', 'Correlating distributed requests.', 'DevOps', 'Aarav Sharma'],
  ['art-d-2', 'Optimizing React 19 Compiler Performance in High-Frequency UIs', 'optimizing-react-19-compiler-performance-in-high-frequency-uis', 'React memoization pipeline.', 'Frontend', 'Priya Patel'],
  ['art-d-3', 'Zero-Trust Network Access for Engineering Infrastructure', 'zero-trust-network-access-for-engineering-infrastructure', 'Identity-aware proxies.', 'Security', 'Vikram Malhotra'],
  ['art-d-4', 'WebAssembly (WASM) in Production: Blazing Fast Client-Side Compute', 'webassembly-wasm-in-production-blazing-fast-client-side-compute', 'C++/Rust in-browser compute.', 'Frontend', 'Aarav Sharma'],
  ['art-d-5', 'Continuous Integration Security: Hardening GitHub Actions CI/CD Pipelines', 'continuous-integration-security-hardening-github-actions-cicd-pipelines', 'Hardening CI/CD pipelines.', 'DevOps', 'Ananya Iyer'],
  ['art-d-6', 'Demystifying Database Sharding and Consistent Hashing in Distributed Systems', 'demystifying-database-sharding-and-consistent-hashing-in-distributed-systems', 'Horizontal sharding.', 'Database', 'Rohan Verma'],
  ['art-d-7', 'Automating Performance Benchmarking with k6 and Grafana Dashboards', 'automating-performance-benchmarking-with-k6-and-grafana-dashboards', 'Stress testing microservices.', 'Testing', 'Neha Gupta'],
  ['art-d-8', 'Event Sourcing with CQRS: Practical Implementation Patterns', 'event-sourcing-with-cqrs-practical-implementation-patterns', 'Append-only immutable events.', 'Architecture', 'Aarav Sharma'],
  ['art-d-9', 'Resilient Sagas with Temporal Workflows in Microservices', 'resilient-sagas-with-temporal-workflows-in-microservices', 'Distributed transactions.', 'Microservices', 'Aarav Sharma'],
  ['art-d-10', 'Automating Code Quality with ESLint and SonarQube in CI Pipelines', 'automating-code-quality-with-eslint-and-sonarqube-in-ci-pipelines', 'Static code analysis.', 'Clean Code', 'Neha Gupta']
];

export const SAMPLE_ARTICLES = pub.map(([id, t, s, desc, d, auth, v], i) => mk(id, t, s, desc, d, auth, 'published', v, getImg(d, i % 3)));
export const SAMPLE_ADMIN_ARTICLES = [
  ...SAMPLE_ARTICLES,
  ...pen.map(([id, t, s, desc, d, auth], i) => mk(id, t, s, desc, d, auth, 'pending', 0, getImg(d, i))),
  ...dra.map(([id, t, s, desc, d, auth], i) => mk(id, t, s, desc, d, auth, 'draft', 0, getImg(d, i)))
];
export const SAMPLE_AUTHORS = [
  { _id: 'u-1', name: 'Aarav Sharma', email: 'aarav.sharma@devsphere.com', role: 'user', websiteUrl: 'https://github.com/aaravsharma-dev', socialMediaId: '@aarav_codes' },
  { _id: 'u-2', name: 'Priya Patel', email: 'priya.patel@devsphere.com', role: 'user', websiteUrl: 'https://priyapatel.tech', socialMediaId: '@priya_patel_io' },
  { _id: 'u-3', name: 'Rohan Verma', email: 'rohan.verma@devsphere.com', role: 'user', websiteUrl: 'https://github.com/rohanverma-eng', socialMediaId: '@rohanv_arch' },
  { _id: 'u-4', name: 'Ananya Iyer', email: 'ananya.iyer@devsphere.com', role: 'user', websiteUrl: 'https://ananyaiyer.dev', socialMediaId: '@ananya_systems' },
  { _id: 'u-5', name: 'Vikram Malhotra', email: 'vikram.malhotra@devsphere.com', role: 'user', websiteUrl: 'https://vikrammalhotra.io', socialMediaId: '@vikram_devops' },
  { _id: 'u-6', name: 'Neha Gupta', email: 'neha.gupta@devsphere.com', role: 'user', websiteUrl: 'https://github.com/nehagupta-cloud', socialMediaId: '@neha_cloud_eng' },
  { _id: 'u-7', name: 'Karthik Raman', email: 'karthik.raman@devsphere.com', role: 'user', websiteUrl: 'https://karthikraman.dev', socialMediaId: '@karthik_scale' },
  { _id: 'u-8', name: 'Divya Nair', email: 'divya.nair@devsphere.com', role: 'user', websiteUrl: 'https://divyanair.tech', socialMediaId: '@divya_nair_dev' },
  { _id: 'u-9', name: 'Siddharth Rao', email: 'siddharth.rao@devsphere.com', role: 'user', websiteUrl: 'https://github.com/siddharth-rao', socialMediaId: '@siddharth_sys' },
  { _id: 'u-10', name: 'Pooja Kulkarni', email: 'pooja.kulkarni@devsphere.com', role: 'user', websiteUrl: 'https://poojakulkarni.io', socialMediaId: '@pooja_backend' }
];