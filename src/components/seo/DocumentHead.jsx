import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

/**
 * DocumentHead component that manages document head elements
 * for better SEO and accessibility
 */
const DocumentHead = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  twitterSite = '@sahilthecoder',
  twitterCreator = '@sahilthecoder',
  structuredData,
  children,
}) => {
  // Update document title and meta description on mount/update
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, description]);

  return (
    <Helmet>
      {/* Base meta tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional head elements */}
      {children}
    </Helmet>
  );
};

DocumentHead.propTypes = {
  /** Page title */
  title: PropTypes.string,
  /** Page meta description */
  description: PropTypes.string,
  /** Canonical URL for the page */
  canonicalUrl: PropTypes.string,
  /** Open Graph type (default: 'website') */
  ogType: PropTypes.oneOf(['website', 'article', 'book', 'profile', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'video.movie', 'video.episode', 'video.tv_show', 'video.other']),
  /** Open Graph image URL */
  ogImage: PropTypes.string,
  /** Open Graph image alt text */
  ogImageAlt: PropTypes.string,
  /** Twitter card type (default: 'summary_large_image') */
  twitterCard: PropTypes.oneOf(['summary', 'summary_large_image', 'app', 'player']),
  /** Twitter username for the website */
  twitterSite: PropTypes.string,
  /** Twitter username of content creator */
  twitterCreator: PropTypes.string,
  /** Structured data in JSON-LD format */
  structuredData: PropTypes.object,
  /** Additional head elements */
  children: PropTypes.node,
};

export default DocumentHead;
