import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  label,
  name,
  placeholder,
  isPhoneNumber,
  isPassword,
  register,
  iconUrl,
  errors,
  stateError,
  bgColour = "bg-white",
  isPending,
  isRequired,
  min,
  max,
}: {
  type?: string;
  label: string;
  name: string;
  placeholder?: string;
  isPhoneNumber?: boolean;
  isPassword?: boolean;
  register: UseFormRegister<any>;
  iconUrl?: string;
  errors?: any;
  stateError?: any;
  bgColour?: string;
  isPending?: boolean;
  isRequired?: boolean;
  min?: string;
  max?: string;
}) => {
  const disabledBgColour = "bg-gray-100";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label className="flex items-center gap-1 font-semibold text-gray-800">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex items-center mt-1">
        {iconUrl && (
          <Image
            src={iconUrl}
            width={20}
            height={20}
            alt={`${label} icon`}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        )}

        {isPhoneNumber && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-turquoise-900">
            +27
          </span>
        )}

        <input
          id={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          disabled={isPending}
          min={min}
          max={max}
          className={`w-full rounded-md border px-3 py-2 pl-${
            iconUrl || isPhoneNumber ? "8" : "3"
          } text-gray-900 focus:outline-none focus:ring-2 focus:ring-turquoise-500 transition ${
            isPending ? disabledBgColour : bgColour
          }`}
          {...register(name)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {(errors?.[name] || stateError?.[name]) && (
        <p className="mt-1 text-sm text-red-500">
          {errors?.[name]?.message || stateError?.[name]}
        </p>
      )}
    </div>
  );
};

export default Input;
