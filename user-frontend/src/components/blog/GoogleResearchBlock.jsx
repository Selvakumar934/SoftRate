import React from 'react';

const GoogleResearchBlock = ({ article }) => {
  if (!article) return null;
  const title = article.title || 'Software Engineering';
  const domain = article.domain || 'Software Development';

  const links = [
    {
      title: `Google Search: "${title}"`,
      desc: 'Browse live developer forums, technical articles, and GitHub repositories',
      url: `https://www.google.com/search?q=${encodeURIComponent(title + ' tutorial guide')}`,
      icon: 'bi-search'
    },
    {
      title: `Google Search: ${domain} Architecture & Production Best Practices`,
      desc: `In-depth research on enterprise ${domain.toLowerCase()} scalability and patterns`,
      url: `https://www.google.com/search?q=${encodeURIComponent(domain + ' production architecture best practices 2026')}`,
      icon: 'bi-box-arrow-up-right'
    },
    {
      title: 'Google Developers Documentation Hub',
      desc: 'Official technical guides, API specifications, and cloud architectures',
      url: 'https://developers.google.com/',
      icon: 'bi-google'
    }
  ];

  return (
    <div className="my-4 py-2">
      <div className="d-flex align-items-center gap-2 mb-2">
        <i className="bi bi-google fs-5 text-dark"></i>
        <h5 className="fw-bold text-dark mb-0">Google Research & Documentation Links</h5>
      </div>
      <p className="text-muted small mb-3">
        Explore external specifications, official research, and technical search queries related to <strong>{title}</strong>:
      </p>

      <div className="d-flex flex-column gap-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="research-link-item hover-popup"
            style={{ fontSize: '0.85rem' }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className={`bi ${link.icon} fs-6 text-dark`}></i>
              <div>
                <span className="fw-bold d-block text-dark">{link.title}</span>
                <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{link.desc}</small>
              </div>
            </div>
            <i className="bi bi-chevron-right text-dark small ms-2"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoogleResearchBlock;