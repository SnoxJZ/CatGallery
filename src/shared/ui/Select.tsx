import React, { PropsWithChildren } from 'react';

interface SelectProps extends PropsWithChildren {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  defaultOptionText?: string;
}

const Select = ({
  id,
  name,
  value,
  onChange,
  errorMessage,
  defaultOptionText,
  children,
}: SelectProps) => {
  return (
    <select
      name={name}
      id={id}
      className="w-full md:w-1/3 block px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
      onChange={onChange}
      value={value}
    >
      <option value="" className="bg-gray-100 text-gray-700">
        {errorMessage || defaultOptionText}
      </option>
      {children}
    </select>
  );
};

export default Select;
