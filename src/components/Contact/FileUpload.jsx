import React from 'react';
import { FaFileUpload } from 'react-icons/fa';

const FileUpload = ({
  id = 'file-upload',
  name = 'attachment',
  label = 'Attach File',
  required = false,
  accept = '.csv, .xls, .xlsx',
  maxSizeMB = 10,
  className = '',
  onChange
}) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size should be less than ${maxSizeMB}MB`);
        e.target.value = '';
        return;
      }
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {!required && <span className="text-gray-500 dark:text-gray-400">(optional)</span>}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg bg-white/30 dark:bg-gray-700/30">
        <div className="space-y-1 text-center">
          <FaFileUpload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <div className="flex text-sm text-gray-600 dark:text-gray-300">
            <label
              htmlFor={id}
              className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name={name}
                type="file"
                className="sr-only"
                accept={accept}
                multiple={false}
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept.split(',').map(ext => ext.trim().toUpperCase()).join(', ')} up to {maxSizeMB}MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
