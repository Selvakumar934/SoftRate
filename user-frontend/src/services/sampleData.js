export const SAMPLE_CATEGORIES = [{
  _id: 'cat-1',
  name: 'Software Development',
  slug: 'software-development',
  description: 'Practical tutorials, clean code patterns, system architecture, and software engineering.'
}];

const mk = (id, title, slug, desc, domain, author, date, img, readTime = 5, views = 1400) => ({
  _id: id,
  title,
  slug,
  shortDescription: desc,
  domain,
  fullContent: `## ${title}\n\nComprehensive software engineering tutorial exploring ${title.toLowerCase()}.\n\n### Core Engineering Principles\n- Write testable, decoupled components.\n- Profile memory and latency in high-throughput paths.\n- Implement robust error boundaries and logging.`,
  featuredImage: img,
  categoryId: SAMPLE_CATEGORIES[0],
  authorId: { _id: 'u-1', name: author, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', bio: 'Senior Software Engineer' },
  publishedDate: new Date(date),
  readingTimeMinutes: readTime,
  viewsCount: views,
  featuredStatus: id === 'art-1',
  status: 'published',
  createdAt: new Date(date),
  updatedAt: new Date(date)
});

export const SAMPLE_ARTICLES = [
  mk('art-1', 'Architecting Scalable Microservices with Node.js', 'architecting-scalable-microservices-with-nodejs', 'Proven architectural patterns for designing resilient, decoupled services with replica sets.', 'Microservices', 'David Miller', '2026-11-12T08:00:00Z', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', 5, 1420),
  mk('art-2', 'Event-Driven Microservices Architecture with Apache Kafka', 'event-driven-microservices-architecture-with-apache-kafka', 'Designing decoupled asynchronous event streams with Kafka brokers, consumers, and idempotency.', 'Microservices', 'Sarah Jenkins', '2026-11-11T10:00:00Z', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', 6, 1820),
  mk('art-3', 'API Gateway Patterns in Distributed Microservices Ecosystems', 'api-gateway-patterns-in-distributed-microservices-ecosystems', 'Centralizing authentication, rate limiting, and request routing across distributed backend services.', 'Microservices', 'Alex Rivera', '2026-11-10T12:00:00Z', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', 4, 2150),
  mk('art-4', 'Clean Code Principles Every Beginner Developer Should Know', 'clean-code-principles-every-beginner-developer-should-know', 'Write code that humans can understand: DRY, KISS, meaningful variable naming, and single-purpose functions.', 'Clean Code', 'Sarah Jenkins', '2026-11-10T09:00:00Z', 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80', 4, 2310),
  mk('art-5', 'Refactoring Legacy Codebases with Clean Code Practices', 'refactoring-legacy-codebases-with-clean-code-practices', 'Transform brittle legacy spaghetti code into maintainable, elegant modules with safe iterative refactoring.', 'Clean Code', 'David Miller', '2026-11-09T14:00:00Z', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', 5, 1670),
  mk('art-6', 'Mastering SOLID Design Principles for Clean Code Architecture', 'mastering-solid-design-principles-for-clean-code-architecture', 'A developer guide to Single Responsibility, Open-Closed, Liskov, Interface Segregation, and Dependency Inversion.', 'Clean Code', 'DevSphere Administrator', '2026-11-08T11:00:00Z', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', 6, 2940),
  mk('art-7', 'Advanced TypeScript Generics and Conditional Types Explained', 'advanced-typescript-generics-and-conditional-types-explained', 'Harness type inference, mapped types, and conditional constraints to write type-safe flexible libraries.', 'TypeScript', 'Alex Rivera', '2026-11-07T16:00:00Z', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 5, 1980),
  mk('art-8', 'Strict TypeScript Configuration Guide for Production Apps', 'strict-typescript-configuration-guide-for-production-apps', 'Optimizing tsconfig compiler flags with strictNullChecks, noImplicitAny, and isolatedModules for robust builds.', 'TypeScript', 'David Miller', '2026-11-06T13:00:00Z', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', 4, 1450),
  mk('art-9', 'Design Patterns: Implementing the Observer Pattern in TypeScript', 'design-patterns-implementing-the-observer-pattern-in-typescript', 'A practical deep dive into behavioral design patterns with a complete type-safe EventEmitter implementation.', 'TypeScript', 'Sarah Jenkins', '2026-11-05T15:00:00Z', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', 5, 2200),
  mk('art-10', 'Mastering Docker Containers for Full-Stack Applications', 'mastering-docker-containers-for-full-stack-applications', 'Step-by-step guide to containerizing web backends and frontends with high-efficiency multi-stage builds.', 'Docker', 'Sarah Jenkins', '2026-11-04T10:00:00Z', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80', 5, 3120),
  mk('art-11', 'Optimizing Docker Image Size with Multi-Stage Alpine Builds', 'optimizing-docker-image-size-with-multi-stage-alpine-builds', 'Shrink container images from 1GB to under 80MB using distroless images, caching layers, and minimal baselines.', 'Docker', 'Alex Rivera', '2026-11-03T09:00:00Z', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', 4, 1780),
  mk('art-12', 'Docker Compose for Multi-Container Local Development Environments', 'docker-compose-for-multi-container-local-development-environments', 'Orchestrate interconnected backend services, caches, and persistent volumes in isolated dev networks.', 'Docker', 'DevSphere Administrator', '2026-11-02T11:00:00Z', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80', 5, 2650),
  mk('art-13', 'Test-Driven Development (TDD) with Modern Testing Frameworks', 'test-driven-development-tdd-with-modern-testing-frameworks', 'Write robust test suites first to produce bulletproof component logic and eliminate regression bugs.', 'Testing', 'DevSphere Administrator', '2026-11-01T14:00:00Z', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', 4, 1890),
  mk('art-14', 'End-to-End Automation Testing Strategies with Playwright', 'end-to-end-automation-testing-strategies-with-playwright', 'Automate realistic cross-browser user flows, flaky test handling, and visual regression testing in CI.', 'Testing', 'Sarah Jenkins', '2026-10-31T08:00:00Z', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 5, 2100),
  mk('art-15', 'Integration Testing Best Practices for REST and GraphQL APIs', 'integration-testing-best-practices-for-rest-and-graphql-apis', 'Mock external dependencies, assert HTTP contracts, and validate server state with automated integration suites.', 'Testing', 'David Miller', '2026-10-30T10:00:00Z', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', 4, 1640),
  mk('art-16', 'Demystifying SQL vs NoSQL: Choosing the Right Database for Your App', 'demystifying-sql-vs-nosql-choosing-the-right-database-for-your-app', 'Comprehensive comparison between relational schemas and document stores with real-world workloads.', 'Database', 'David Miller', '2026-10-29T12:00:00Z', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80', 5, 2780),
  mk('art-17', 'Database Indexing Strategies for High-Performance Queries', 'database-indexing-strategies-for-high-performance-queries', 'Understand B-Tree indexes, compound indexes, explain plans, and query bottlenecks to accelerate lookups.', 'Database', 'Alex Rivera', '2026-10-28T16:00:00Z', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80', 5, 1950),
  mk('art-18', 'Managing Database Migrations and ACID Transactions in Production', 'managing-database-migrations-and-acid-transactions-in-production', 'Execute zero-downtime schema migrations, manage distributed transactions, and prevent deadlocks.', 'Database', 'Sarah Jenkins', '2026-10-27T09:00:00Z', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80', 6, 2410)
];
