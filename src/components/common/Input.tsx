import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} 
            rounded-md shadow-sm focus:outline-none focus:ring-1 
            focus:ring-cyan-500 focus:border-cyan-500 ${widthClass} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;