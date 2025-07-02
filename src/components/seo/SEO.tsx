import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  noIndex?: boolean;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'profile' | 'book';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/images/og-default.jpg',
  article = false,
  noIndex = false,
  canonicalUrl,
  type = 'website',
  author = 'Sahil Ali',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://sahilthecoder.github.io/Sahil-Portfolio';
  const fullUrl = canonicalUrl || `${siteUrl}${pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const siteName = 'Sahil Ali | Portfolio';
  const twitterHandle = '@sahilthecoder';

  // Default meta tags
  const defaultTitle = 'Sahil Ali | Inventory Specialist & Data Analyst';
  const defaultDescription = 'Experienced Inventory Specialist and Data Analyst specializing in data analysis, dashboard design, and system optimization.';
  
  const seo = {
    title: title ? `${title} | ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    image: fullImageUrl,
    url: fullUrl,
    type: article ? 'article' : type,
  };

  // Schema.org JSON-LD
  const schemaOrgWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: fullUrl,
    name: seo.title,
    description: seo.description,
    publisher: {
      '@type': 'ProfilePage',
      name: author,
    },
  };

  const schemaOrgPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sahil Ali',
    url: siteUrl,
    sameAs: [
      'https://github.com/sahilthecoder',
      'https://linkedin.com/in/yourprofile',
    ],
    jobTitle: 'Inventory Specialist & Data Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Your Current Company',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title || 'Page',
        item: fullUrl,
      },
    ],
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={`%s | ${siteName}`}
      defaultTitle={defaultTitle}
    >
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* No index if needed */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Article specific */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      {article && section && (
        <meta property="article:section" content={section} />
      )}
      {article && tags.length > 0 &&
        tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgPerson)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
};

export default SEO;
