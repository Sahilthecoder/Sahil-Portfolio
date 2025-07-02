import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';
import useServiceWorker from '../hooks/useServiceWorker';

const UpdateNotification: React.FC = () => {
  const [show, setShow] = useState(false);
  const [state, skipWaiting] = useServiceWorker();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state === 'updated') {
      setShow(true);
      setIsVisible(true);
    }
  }, [state]);

  const handleUpdate = () => {
    skipWaiting();
    setShow(false);
    setTimeout(() => setIsVisible(false), 500);
  };

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => setIsVisible(false), 500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <RefreshCw className="h-5 w-5 text-blue-500" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New update available!
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                A new version of the portfolio is available. Refresh to see the latest changes.
              </p>
              <div className="mt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update now
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateNotification;
