import React from 'react';

const TestRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Test Route Working!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This confirms that routing is working correctly.
        </p>
      </div>
    </div>
  );
};

export default TestRoute;
