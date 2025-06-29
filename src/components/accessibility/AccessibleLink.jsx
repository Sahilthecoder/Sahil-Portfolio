import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useKeyboardEvents } from '../../../hooks/useAccessibility';

/**
 * AccessibleLink component that enhances native anchor tags with better accessibility
 */
const AccessibleLink = forwardRef(
  (
    {
      children,
      href,
      onClick,
      onKeyDown,
      className = '',
      external = false,
      ariaLabel,
      ariaCurrent,
      ...props
    },
    ref
  ) => {
    // Handle keyboard events
    const handleKeyDown = (e) => {
      // Call the provided onKeyDown handler if it exists
      if (onKeyDown) {
        onKeyDown(e);
      }

      // Handle space key for link activation
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        } else if (href && !external) {
          window.location.href = href;
        }
      }
    };

    // Set up keyboard event handlers
    useKeyboardEvents(
      {
        ' ': (e) => {
          if (e.target === ref?.current) {
            e.preventDefault();
            if (onClick) {
              onClick(e);
            } else if (href && !external) {
              window.location.href = href;
            }
          }
        },
        Enter: (e) => {
          if (e.target === ref?.current) {
            if (onClick) {
              onClick(e);
            } else if (href && !external) {
              window.location.href = href;
            }
          }
        },
      },
      true,
      { current: ref?.current || null }
    );

    const linkProps = {
      ref,
      href,
      onClick,
      onKeyDown: handleKeyDown,
      className: `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`,
      'aria-label': ariaLabel,
      'aria-current': ariaCurrent,
      ...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-describedby': 'external-link',
      }),
      ...props,
    };

    return (
      <>
        <a {...linkProps}>
          {children}
          {external && (
            <span className="sr-only" id="external-link">
              (opens in a new tab)
            </span>
          )}
        </a>
      </>
    );
  }
);

AccessibleLink.displayName = 'AccessibleLink';

AccessibleLink.propTypes = {
  /** Link content */
  children: PropTypes.node.isRequired,
  /** URL the link points to */
  href: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** Key down handler */
  onKeyDown: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Whether the link opens in a new tab */
  external: PropTypes.bool,
  /** ARIA label for the link */
  ariaLabel: PropTypes.string,
  /** ARIA current attribute */
  ariaCurrent: PropTypes.oneOf([
    'page',
    'step',
    'location',
    'date',
    'time',
    'true',
    'false',
  ]),
};

export default AccessibleLink;
