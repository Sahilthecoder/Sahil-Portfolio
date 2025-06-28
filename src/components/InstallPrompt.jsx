import React, { useEffect, useRef } from 'react';

const InstallPrompt = ({ onInstall, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Set initial focus when modal opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Handle escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      id="install-screen"
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-all duration-300 install-prompt-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-screen-title"
      tabIndex="-1"
      data-inert="true"
    >
      <div
        ref={contentRef}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-out shadow-2xl border border-gray-200 dark:border-gray-700"
        tabIndex="0"
      >
        <h2 id="install-screen-title" className="text-xl font-bold mb-4">
          Install Sahil Ali's Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Add this app to your home screen for quick access and offline capabilities.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onInstall}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Install
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
