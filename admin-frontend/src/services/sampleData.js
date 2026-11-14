export const FALLBACK_METRICS = { totalArticles: 38, publishedArticles: 18, pendingArticles: 10, draftArticles: 10, totalViews: 58400 };

export const FALLBACK_USERS = [
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

const img = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
const a = (id, title, slug, domain, status, author, views = 1200) => ({
  _id: id, title, slug, domain, status, shortDescription: `${title} - practical engineering guide for ${domain}.`,
  authorId: { name: author, email: `${author.toLowerCase().replace(/\s+/g, '.')}@devsphere.com` }, viewsCount: views, featuredImage: img,
  createdAt: new Date()
});

const pub = [
  ['art-1', 'Architecting Scalable Microservices with Node.js', 'architecting-scalable-microservices-with-nodejs', 'Microservices', 'Aarav Sharma', 1420],
  ['art-2', 'Event-Driven Microservices Architecture with Apache Kafka', 'event-driven-microservices-architecture-with-apache-kafka', 'Microservices', 'Priya Patel', 1820],
  ['art-3', 'API Gateway Patterns in Distributed Microservices Ecosystems', 'api-gateway-patterns-in-distributed-microservices-ecosystems', 'Microservices', 'Rohan Verma', 2150],
  ['art-4', 'Clean Code Principles Every Beginner Developer Should Know', 'clean-code-principles-every-beginner-developer-should-know', 'Clean Code', 'Neha Gupta', 2310],
  ['art-5', 'Refactoring Legacy Codebases with Clean Code Practices', 'refactoring-legacy-codebases-with-clean-code-practices', 'Clean Code', 'Aarav Sharma', 1670],
  ['art-6', 'Mastering SOLID Design Principles for Clean Code Architecture', 'mastering-solid-design-principles-for-clean-code-architecture', 'Clean Code', 'DevSphere Administrator', 2940],
  ['art-7', 'Advanced TypeScript Generics and Conditional Types Explained', 'advanced-typescript-generics-and-conditional-types-explained', 'TypeScript', 'Priya Patel', 1980],
  ['art-8', 'Strict TypeScript Configuration Guide for Production Apps', 'strict-typescript-configuration-guide-for-production-apps', 'TypeScript', 'Aarav Sharma', 1450],
  ['art-9', 'Design Patterns: Implementing the Observer Pattern in TypeScript', 'design-patterns-implementing-the-observer-pattern-in-typescript', 'TypeScript', 'Priya Patel', 2200],
  ['art-10', 'Mastering Docker Containers for Full-Stack Applications', 'mastering-docker-containers-for-full-stack-applications', 'Docker', 'Ananya Iyer', 3120],
  ['art-11', 'Optimizing Docker Image Size with Multi-Stage Alpine Builds', 'optimizing-docker-image-size-with-multi-stage-alpine-builds', 'Docker', 'Vikram Malhotra', 1780],
  ['art-12', 'Docker Compose for Multi-Container Local Development Environments', 'docker-compose-for-multi-container-local-development-environments', 'Docker', 'DevSphere Administrator', 2650],
  ['art-13', 'Test-Driven Development (TDD) with Modern Testing Frameworks', 'test-driven-development-tdd-with-modern-testing-frameworks', 'Testing', 'DevSphere Administrator', 1890],
  ['art-14', 'End-to-End Automation Testing Strategies with Playwright', 'end-to-end-automation-testing-strategies-with-playwright', 'Testing', 'Neha Gupta', 2100],
  ['art-15', 'Integration Testing Best Practices for REST and GraphQL APIs', 'integration-testing-best-practices-for-rest-and-graphql-apis', 'Testing', 'Aarav Sharma', 1640],
  ['art-16', 'Demystifying SQL vs NoSQL: Choosing the Right Database for Your App', 'demystifying-sql-vs-nosql-choosing-the-right-database-for-your-app', 'Database', 'Rohan Verma', 2780],
  ['art-17', 'Database Indexing Strategies for High-Performance Queries', 'database-indexing-strategies-for-high-performance-queries', 'Database', 'Rohan Verma', 1950],
  ['art-18', 'Managing Database Migrations and ACID Transactions in Production', 'managing-database-migrations-and-acid-transactions-in-production', 'Database', 'Priya Patel', 2410]
];

const pen = [
  ['art-p-1', 'Deep Dive into Linux Kernel System Calls for Web Developers', 'deep-dive-into-linux-kernel-system-calls-for-web-developers', 'Architecture', 'Aarav Sharma'],
  ['art-p-2', 'Web Security Hardening: Securing Microservices from XSS and CSRF', 'web-security-hardening-securing-microservices-from-xss-and-csrf', 'Security', 'Vikram Malhotra'],
  ['art-p-3', 'Git and GitHub Workflow: A Step-by-Step Production Guide', 'git-and-github-workflow-step-by-step-production-guide', 'DevOps', 'Ananya Iyer'],
  ['art-p-4', 'Building High-Throughput Caching with Redis In-Memory Store', 'building-high-throughput-caching-with-redis-in-memory-store', 'Architecture', 'DevSphere Administrator'],
  ['art-p-5', 'GraphQL Schema Federation: Composing Distributed Subgraphs', 'graphql-schema-federation-composing-distributed-subgraphs', 'Architecture', 'Aarav Sharma'],
  ['art-p-6', 'Kubernetes Custom Resource Definitions (CRDs) and Operator Pattern', 'kubernetes-custom-resource-definitions-crds-and-operator-pattern', 'DevOps', 'Ananya Iyer'],
  ['art-p-7', 'Rust Memory Safety and Concurrency Models for High-Scale Backend Systems', 'rust-memory-safety-and-concurrency-models-for-high-scale-backend-systems', 'Architecture', 'Rohan Verma'],
  ['art-p-8', 'Implementing Distributed Locks and Rate Limiting with Redis Redlock', 'implementing-distributed-locks-and-rate-limiting-with-redis-redlock', 'Database', 'Rohan Verma'],
  ['art-p-9', 'Defensive API Design: Zero-Trust Input Validation with Zod and TypeScript', 'defensive-api-design-zero-trust-input-validation-with-zod-and-typescript', 'TypeScript', 'Priya Patel'],
  ['art-p-10', 'Architecting Multi-Tenant Microservices with Tenant Isolation', 'architecting-multi-tenant-microservices-with-tenant-isolation', 'Microservices', 'Aarav Sharma']
];

const dra = [
  ['art-d-1', 'Distributed Tracing and Observability with OpenTelemetry', 'distributed-tracing-and-observability-with-opentelemetry', 'DevOps', 'Aarav Sharma'],
  ['art-d-2', 'Optimizing React 19 Compiler Performance in High-Frequency UIs', 'optimizing-react-19-compiler-performance-in-high-frequency-uis', 'Frontend', 'Priya Patel'],
  ['art-d-3', 'Zero-Trust Network Access for Engineering Infrastructure', 'zero-trust-network-access-for-engineering-infrastructure', 'Security', 'Vikram Malhotra'],
  ['art-d-4', 'WebAssembly (WASM) in Production: Blazing Fast Client-Side Compute', 'webassembly-wasm-in-production-blazing-fast-client-side-compute', 'Frontend', 'Aarav Sharma'],
  ['art-d-5', 'Continuous Integration Security: Hardening GitHub Actions CI/CD Pipelines', 'continuous-integration-security-hardening-github-actions-cicd-pipelines', 'DevOps', 'Ananya Iyer'],
  ['art-d-6', 'Demystifying Database Sharding and Consistent Hashing in Distributed Systems', 'demystifying-database-sharding-and-consistent-hashing-in-distributed-systems', 'Database', 'Rohan Verma'],
  ['art-d-7', 'Automating Performance Benchmarking with k6 and Grafana Dashboards', 'automating-performance-benchmarking-with-k6-and-grafana-dashboards', 'Testing', 'Neha Gupta'],
  ['art-d-8', 'Event Sourcing with CQRS: Practical Implementation Patterns', 'event-sourcing-with-cqrs-practical-implementation-patterns', 'Architecture', 'Aarav Sharma'],
  ['art-d-9', 'Resilient Sagas with Temporal Workflows in Microservices', 'resilient-sagas-with-temporal-workflows-in-microservices', 'Microservices', 'Karthik Raman'],
  ['art-d-10', 'Automating Code Quality with ESLint and SonarQube in CI Pipelines', 'automating-code-quality-with-eslint-and-sonarqube-in-ci-pipelines', 'Clean Code', 'Divya Nair']
];

export const FALLBACK_ADMIN_ARTICLES = [
  ...pub.map(([id, t, s, d, auth, v]) => a(id, t, s, d, 'published', auth, v)),
  ...pen.map(([id, t, s, d, auth]) => a(id, t, s, d, 'pending', auth, 0)),
  ...dra.map(([id, t, s, d, auth]) => a(id, t, s, d, 'draft', auth, 0))
];