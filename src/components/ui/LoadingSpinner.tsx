import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'black';
  className?: string;
  fullScreen?: boolean;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

const colorClasses = {
  primary: 'border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent',
  secondary: 'border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent',
  white: 'border-t-white border-r-white border-b-transparent border-l-transparent',
  black:
    'border-t-gray-900 border-r-gray-900 border-b-transparent border-l-transparent dark:border-t-gray-100 dark:border-r-gray-100',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  fullScreen = false,
  label = 'Loading...',
}) => {
  const spinner = (
    <div
      className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        {spinner}
        {label && (
          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        )}
      </div>
    );
  }

  return spinner;
};

// Full page loading spinner
export const FullPageSpinner: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" fullScreen label={label} />
  </div>
);

// Inline loading spinner with text
export const InlineSpinner: React.FC<{ text?: string; className?: string }> = ({
  text = 'Loading',
  className = '',
}) => (
  <div className={`inline-flex items-center space-x-2 ${className}`}>
    <LoadingSpinner size="sm" />
    <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
  </div>
);

// Button loading spinner
export const ButtonSpinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center ${className}`}>
    <LoadingSpinner size="sm" color="white" className="mr-2" />
    Processing...
  </div>
);

export default LoadingSpinner;
