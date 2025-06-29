import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useKeyboardEvents } from '../../hooks/useAccessibility';

/**
 * AccessibleButton component that enhances native button with better accessibility
 */
const AccessibleButton = forwardRef(
  (
    {
      children,
      onClick,
      onKeyDown,
      className = '',
      disabled = false,
      type = 'button',
      ariaLabel,
      ariaExpanded,
      ariaControls,
      ariaPressed,
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

      // Handle space key for button activation
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (onClick) {
          onClick(e);
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
            }
          }
        },
        Enter: (e) => {
          if (e.target === ref?.current && onClick) {
            onClick(e);
          }
        },
      },
      true,
      { current: ref?.current || null }
    );

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-pressed={ariaPressed}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

AccessibleButton.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Click handler */
  onClick: PropTypes.func,
  /** Key down handler */
  onKeyDown: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** ARIA label for the button */
  ariaLabel: PropTypes.string,
  /** ARIA expanded state */
  ariaExpanded: PropTypes.bool,
  /** ARIA controls attribute */
  ariaControls: PropTypes.string,
  /** ARIA pressed state */
  ariaPressed: PropTypes.bool,
};

export default AccessibleButton;
