import React from 'react';

const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  required = false,
  value,
  onChange,
  placeholder = '',
  className = '',
  ...props
}) => {
  const inputClasses = `w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`${inputClasses} min-h-[150px]`}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

export default FormInput;
