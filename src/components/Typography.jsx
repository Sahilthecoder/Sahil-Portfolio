import React from 'react';

export const H1 = ({ children, className = '', ...props }) => (
  <h1 
    className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 ${className}`}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className = '', ...props }) => (
  <h2 
    className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 ${className}`}
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className = '', ...props }) => (
  <h3 
    className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const H4 = ({ children, className = '', ...props }) => (
  <h4 
    className={`text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 ${className}`}
    {...props}
  >
    {children}
  </h4>
);

export const P = ({ children, className = '', ...props }) => (
  <p 
    className={`text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 ${className}`}
    {...props}
  >
    {children}
  </p>
);

export const Lead = ({ children, className = '', ...props }) => (
  <p 
    className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6 ${className}`}
    {...props}
  >
    {children}
  </p>
);

export const Small = ({ children, className = '', ...props }) => (
  <small 
    className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </small>
);
