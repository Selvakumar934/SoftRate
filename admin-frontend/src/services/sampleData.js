export const FALLBACK_METRICS = {
  totalArticles: 26,
  publishedArticles: 18,
  pendingArticles: 5,
  draftArticles: 3,
  totalViews: 38260
};

const mk = (id, title, desc, domain, status, author, daysAgo, img, views = 1200) => ({
  _id: id,
  title,
  shortDescription: desc,
  domain,
  status,
  authorId: { name: author },
  viewsCount: views,
  featuredImage: img,
  createdAt: new Date(Date.now() - daysAgo * 86400000)
});

export const FALLBACK_ADMIN_ARTICLES = [
  mk('art-1', 'Architecting Scalable Microservices with Node.js', 'Proven architectural patterns for designing resilient, decoupled services.', 'Microservices', 'published', 'David Miller', 2, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', 1420),
  mk('art-2', 'Event-Driven Microservices Architecture with Apache Kafka', 'Designing decoupled asynchronous event streams with Kafka brokers.', 'Microservices', 'published', 'Sarah Jenkins', 3, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', 1820),
  mk('art-4', 'Clean Code Principles Every Beginner Developer Should Know', 'Write code that humans can understand: DRY, KISS, meaningful variable naming.', 'Clean Code', 'published', 'Sarah Jenkins', 3, 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80', 2310),
  mk('art-7', 'Advanced TypeScript Generics and Conditional Types Explained', 'Harness type inference, mapped types, and conditional constraints.', 'TypeScript', 'published', 'Alex Rivera', 2, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 1980),
  mk('art-10', 'Mastering Docker Containers for Full-Stack Applications', 'Step-by-step guide to containerizing web backends and frontends.', 'Docker', 'published', 'Sarah Jenkins', 1, 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80', 3120),
  mk('art-13', 'Test-Driven Development (TDD) with Modern Testing Frameworks', 'Write robust test suites first to produce bulletproof component logic.', 'Testing', 'published', 'DevSphere Administrator', 2, 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', 1890),
  mk('art-16', 'Demystifying SQL vs NoSQL: Choosing the Right Database for Your App', 'Comprehensive comparison between relational schemas and document stores.', 'Database', 'published', 'David Miller', 3, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80', 2780),
  mk('art-p-1', 'Deep Dive into Linux Kernel System Calls for Web Developers', 'Understanding epoll, file descriptors, and non-blocking IO.', 'Architecture', 'pending', 'David Miller', 1, 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80', 0),
  mk('art-p-2', 'Web Security Hardening: Securing Microservices from XSS and CSRF', 'Essential defense-in-depth security strategies for modern APIs.', 'Security', 'pending', 'Sarah Jenkins', 1, 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80', 0),
  mk('art-p-3', 'Git and GitHub Workflow: A Step-by-Step Production Guide', 'Master version control branching strategies and pull requests.', 'DevOps', 'pending', 'Alex Rivera', 2, 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80', 0),
  mk('art-d-1', 'Distributed Tracing and Observability with OpenTelemetry', 'Correlating distributed requests across container boundaries.', 'DevOps', 'draft', 'David Miller', 5, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', 0)
];
