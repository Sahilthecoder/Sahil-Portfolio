import React from 'react';
import PropTypes from 'prop-types';

/**
 * SemanticHeading component that ensures proper heading hierarchy
 */
export const SemanticHeading = ({ level = 1, children, className = '', id, ...props }) => {
  const HeadingTag = `h${Math.min(Math.max(1, level), 6)}`;
  
  return (
    <HeadingTag 
      className={className}
      id={id}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

SemanticHeading.propTypes = {
  /** Heading level (1-6) */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Heading content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** ID for the heading (useful for anchor links) */
  id: PropTypes.string,
};

/**
 * Section component that provides semantic structure and proper heading hierarchy
 */
export const Section = ({ 
  children, 
  level = 2, 
  title, 
  className = '',
  id,
  ...props 
}) => {
  const headingId = id || (typeof title === 'string' ? title.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  return (
    <section 
      className={`section ${className}`} 
      aria-labelledby={headingId}
      {...props}
    >
      {title && (
        <SemanticHeading level={level} id={headingId}>
          {title}
        </SemanticHeading>
      )}
      {children}
    </section>
  );
};

Section.propTypes = {
  /** Section content */
  children: PropTypes.node.isRequired,
  /** Heading level for the section title (2-6) */
  level: PropTypes.oneOf([2, 3, 4, 5, 6]),
  /** Section title */
  title: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** ID for the section (used for the heading ID if provided) */
  id: PropTypes.string,
};

/**
 * Article component that provides semantic structure for self-contained content
 */
export const Article = ({ 
  children, 
  title, 
  headingLevel = 2,
  className = '',
  id,
  ...props 
}) => {
  const headingId = id || (typeof title === 'string' ? title.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  return (
    <article 
      className={`article ${className}`} 
      aria-labelledby={headingId}
      {...props}
    >
      {title && (
        <SemanticHeading level={headingLevel} id={headingId}>
          {title}
        </SemanticHeading>
      )}
      {children}
    </article>
  );
};

Article.propTypes = {
  /** Article content */
  children: PropTypes.node.isRequired,
  /** Article title */
  title: PropTypes.node,
  /** Heading level for the article title (1-6) */
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** ID for the article (used for the heading ID if provided) */
  id: PropTypes.string,
};

/**
 * Nav component that provides semantic navigation structure
 */
export const Nav = ({ 
  children, 
  label, 
  className = '',
  ...props 
}) => (
  <nav 
    className={`nav ${className}`} 
    aria-label={label || 'Navigation'}
    {...props}
  >
    <ul className="nav-list">
      {React.Children.map(children, (child, index) => (
        <li key={index} className="nav-item">
          {child}
        </li>
      ))}
    </ul>
  </nav>
);

Nav.propTypes = {
  /** Navigation items */
  children: PropTypes.node.isRequired,
  /** ARIA label for the navigation */
  label: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
};
