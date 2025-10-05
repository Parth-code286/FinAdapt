import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, placeholder, name, type, onChange, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className="mb-6 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-semibold text-[#cfcfd6] tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative group">
        <input
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-12 rounded-lg bg-[#1c1c2c] text-white border border-[#2e2e42] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] placeholder:text-slate-500 transition duration-200 ease-in-out shadow-md shadow-[#8b5cf61a]"
        />

        {isPasswordType && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg cursor-pointer text-slate-400 hover:text-[#8b5cf6] transition duration-150">
            {showPassword ? (
              <FaRegEye size={20} onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={20} onClick={toggleShowPassword} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
