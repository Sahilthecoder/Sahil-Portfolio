import React, { forwardRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail, FiGithub, FiLinkedin, FiTwitter, FiLoader } from 'react-icons/fi';
import PropTypes from 'prop-types';

const iconMap = {
  arrow: <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />,
  download: <FiDownload className="ml-2" />,
  mail: <FiMail className="mr-2" />,
  github: <FiGithub className="mr-2" />,
  linkedin: <FiLinkedin className="mr-2" />,
  twitter: <FiTwitter className="mr-2" />,
};

// Button variants configuration
const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
  success: 'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2',
  info: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  light: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2',
  dark: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2',
  link: 'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
};

// Button sizes configuration
const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

// Button icon sizes configuration
const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

/**
 * ModernButton Component
 * 
 * A highly customizable button component with built-in animations, loading states,
 * and various styling options.
 * 
 * @component
 * @example
 * // Basic usage
 * <ModernButton>Click me</ModernButton>
 * 
 * // With icon
 * <ModernButton icon="arrow">Next</ModernButton>
 * 
 * // Loading state
 * <ModernButton isLoading>Processing...</ModernButton>
 * 
 * // Full width
 * <ModernButton fullWidth>Full Width Button</ModernButton>
 */
const ModernButton = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'right',
  iconClassName = '',
  className = '',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  rounded = 'xl',
  uppercase = false,
  shadow = true,
  ripple = true,
  as: Component = 'button',
  onClick,
  ...props
}, ref) => {
  const controls = useAnimation();
  
  // Base button styles
  const baseStyles = [
    'inline-flex items-center justify-center font-medium',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-all duration-200 ease-in-out',
    'relative overflow-hidden',
    'group',
    `rounded-${rounded}`,
    uppercase ? 'uppercase tracking-wider' : '',
    shadow ? 'shadow-sm hover:shadow-md' : 'shadow-none',
    fullWidth ? 'w-full' : 'w-auto',
    buttonVariants[variant] || buttonVariants.primary,
    buttonSizes[size] || buttonSizes.md,
    disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');
  
  // Handle button click with ripple effect
  const handleClick = (e) => {
    if (disabled || isLoading) return;
    
    // Create ripple effect
    if (ripple && typeof document !== 'undefined') {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'absolute bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    }
    
    // Call original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  // Render icon with proper sizing
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconElement = typeof icon === 'string' ? iconMap[icon] : icon;
    const iconSize = iconSizes[size] || iconSizes.md;
    
    // Safely get the existing className
    const existingClassName = React.isValidElement(iconElement) 
      ? (iconElement.props?.className || '')
      : '';
    
    return React.isValidElement(iconElement) ? React.cloneElement(iconElement, {
      className: [
        existingClassName,
        iconSize,
        iconPosition === 'left' ? 'mr-2' : 'ml-2',
        isLoading ? 'opacity-0' : 'opacity-100',
        iconClassName,
      ].filter(Boolean).join(' '),
    }) : null;
  };
  
  // Loading spinner
  const renderLoadingSpinner = () => {
    if (!isLoading) return null;
    
    const spinnerSize = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    }[size] || 'w-5 h-5';
    
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <FiLoader className={`${spinnerSize} animate-spin`} />
      </div>
    );
  };
  
  // Button content
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && renderIcon()}
      <span className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      {icon && iconPosition === 'right' && renderIcon()}
      {renderLoadingSpinner()}
    </>
  );
  
  // Button element with motion
  const buttonElement = (
    <motion.div
      className={fullWidth ? 'w-full' : 'inline-block'}
      whileHover={!disabled && !isLoading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {React.isValidElement(Component) ? (
        React.cloneElement(Component, {
          className: baseStyles,
          disabled: disabled || isLoading,
          'aria-disabled': disabled || isLoading,
          ref,
          onClick: handleClick,
          ...props,
          children: buttonContent,
        })
      ) : (
        <Component
          className={baseStyles}
          disabled={disabled || isLoading}
          aria-disabled={disabled || isLoading}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {buttonContent}
        </Component>
      )}
    </motion.div>
  );
  
  return buttonElement;
});

// Prop types for better development experience
ModernButton.propTypes = {
  /** Button content */
  children: PropTypes.node,
  /** Button style variant */
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'accent', 'outline', 'ghost',
    'danger', 'success', 'warning', 'info', 'light', 'dark', 'link'
  ]),
  /** Button size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Icon name or element to display */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  /** Position of the icon */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Additional class name for the icon */
  iconClassName: PropTypes.string,
  /** Additional class name for the button */
  className: PropTypes.string,
  /** Show loading state */
  isLoading: PropTypes.bool,
  /** Disable the button */
  disabled: PropTypes.bool,
  /** Make button full width */
  fullWidth: PropTypes.bool,
  /** Border radius size */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
  /** Uppercase text */
  uppercase: PropTypes.bool,
  /** Show shadow */
  shadow: PropTypes.bool,
  /** Enable ripple effect */
  ripple: PropTypes.bool,
  /** Render as a different HTML element or React component */
  as: PropTypes.elementType,
  /** Click handler */
  onClick: PropTypes.func,
};

ModernButton.displayName = 'ModernButton';

export default ModernButton;
