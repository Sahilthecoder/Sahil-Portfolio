import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const SubmitButton = ({ children = 'Send Request', className = '', ...props }) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        className={`group relative inline-flex items-center px-8 py-4 bg-indigo-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center">
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {children}
          </span>
          <FaPaperPlane className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
        </span>
        <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
      </button>
    </div>
  );
};

export default SubmitButton;
