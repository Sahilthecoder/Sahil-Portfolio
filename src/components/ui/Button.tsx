import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  [key: string]: any; // Allow any other props
}

type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    [key: string]: any; // Allow any other props
  };

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 border-transparent',
  secondary:
    'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 border-transparent dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border-transparent',
  ghost:
    'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500 border-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
  outline:
    'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 hover:text-gray-900 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
  link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500 border-transparent dark:text-blue-400 dark:hover:text-blue-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText = 'Loading...',
      leftIcon,
      rightIcon,
      isFullWidth = false,
      isDisabled = false,
      className = '',
      children,
      as: Component = 'button',
      to,
      href,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isLink = Component === 'a' || Component === Link || href || to;
    const isButton = !isLink;
    const isExternal = (href && /^https?:\/\//.test(href)) || props.target === '_blank';

    const baseStyles =
      'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none';
    const widthStyles = isFullWidth ? 'w-full' : '';

    // Handle different element types
    // Ensure variant and size have valid values
    const safeVariant = variant || 'primary';
    const safeSize = size || 'md';
    
    const elementProps: Record<string, any> = {
      className: clsx(
        baseStyles,
        variantStyles[safeVariant as keyof typeof variantStyles],
        sizeStyles[safeSize as keyof typeof sizeStyles],
        widthStyles,
        safeVariant === 'outline' && 'border',
        className
      ),
      disabled: isDisabled || isLoading,
      'aria-disabled': isDisabled || isLoading || undefined,
    };

    // Add type for buttons
    if (isButton) {
      elementProps.type = type;
    }

    // Handle link-specific props
    if (isLink) {
      if (Component === Link) {
        // For React Router Link
        elementProps.to = to;
      } else {
        // For regular anchor tags
        elementProps.href = to || href;
        if (isExternal) {
          elementProps.target = '_blank';
          elementProps.rel = 'noopener noreferrer';
        } else if (props.target) {
          elementProps.target = props.target;
        }
        if (props.rel) {
          elementProps.rel = props.rel;
        }
      }
    }

    // Add all other props
    Object.keys(props).forEach(key => {
      if (key !== 'to' && key !== 'href' && key !== 'target' && key !== 'rel') {
        elementProps[key] = props[key as keyof typeof props];
      }
    });

    // If loading, show loading state
    if (isLoading) {
      return (
        <Component
          {...elementProps}
          className={clsx(elementProps.className, 'cursor-not-allowed')}
          ref={ref as any}
        >
          <svg
            className={clsx(
              'animate-spin -ml-1 mr-2',
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </Component>
      );
    }

    // Normal button state
    return (
      <Component {...elementProps} ref={ref as any}>
        {leftIcon && (
          <span className={clsx(children ? 'mr-2' : '')} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={clsx(children ? 'ml-2' : '')} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
