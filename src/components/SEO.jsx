import React from 'react';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description, 
  type = 'website', 
  image = '/images/og-default.jpg',
  structuredData = null,
  children 
}) => {
  const pageTitle = title ? `${title} | Professional Portfolio` : 'Professional Portfolio';
  const pageDescription = description || 'Explore my professional portfolio showcasing my skills and experience.';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pageImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...structuredData
          })}
        </script>
      )}
      
      {children}
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'project']),
  image: PropTypes.string,
  structuredData: PropTypes.object,
  children: PropTypes.node
};

export default SEO;
