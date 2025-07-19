import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiArrowRight, FiLoader } from 'react-icons/fi';

// Icon mapping
const iconMap = {
  'FiDownload': FiDownload,
  'FiMail': FiMail,
  'FiArrowRight': FiArrowRight,
};

// Button variants configuration
const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
  ghost: 'hover:bg-gray-100 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

// Button sizes configuration
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  as: Component = 'button',
  ...props
}, ref) => {
  // Get the icon component if a string is provided
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon;
  
  // Base button classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'rounded-lg',
    'font-medium',
    'transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  // Handle click
  const handleClick = (e) => {
    if (isLoading || disabled) return;
    if (props.onClick) props.onClick(e);
  };

  // Button content
  const content = (
    <>
      {IconComponent && iconPosition === 'left' && (
        <IconComponent className="w-4 h-4 mr-2" />
      )}
      {children}
      {IconComponent && iconPosition === 'right' && (
        <IconComponent className="w-4 h-4 ml-2" />
      )}
      {isLoading && (
        <FiLoader className="ml-2 animate-spin w-4 h-4" />
      )}
    </>
  );

  // For custom components (like React Router's Link)
  if (typeof Component !== 'string') {
    return (
      <Component
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </Component>
    );
  }

  // For HTML elements (button, a, etc.)
  const MotionComponent = motion[Component] || motion.button;
  
  return (
    <MotionComponent
      ref={ref}
      className={baseClasses}
      disabled={disabled || isLoading}
      onClick={handleClick}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      whileHover={!disabled && !isLoading ? { y: -1 } : {}}
      {...props}
    >
      {content}
    </MotionComponent>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Button content */
  children: PropTypes.node,
  /** Button style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  /** Button size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Icon component or name (e.g., 'FiDownload', 'FiMail', 'FiArrowRight') */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  /** Position of the icon relative to the text */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Show loading state */
  isLoading: PropTypes.bool,
  /** Disable the button */
  disabled: PropTypes.bool,
  /** Make button full width */
  fullWidth: PropTypes.bool,
  /** Render as a different component or HTML element */
  as: PropTypes.elementType,
};

export default Button;
