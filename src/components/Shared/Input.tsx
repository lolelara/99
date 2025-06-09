import React from 'react';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'file' | 'select' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  name?: string;
  min?: string;
  max?: string;
  id?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  required,
  error,
  placeholder,
  options,
  name,
  min,
  max,
  id,
  icon,
}) => {
  const baseClasses = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400";
  const borderClasses = error ? 'border-red-500' : 'border-gray-600';
  const iconClasses = icon ? 'ps-10' : '';

  const renderInput = () => {
    if (type === 'select' && options) {
      return (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
          className={`${baseClasses} ${borderClasses}`}
          required={required}
        >
          <option value="">{placeholder || label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        placeholder={placeholder}
        className={`${baseClasses} ${borderClasses} ${iconClasses}`}
        required={required}
        min={min}
        max={max}
      />
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        {renderInput()}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Input;