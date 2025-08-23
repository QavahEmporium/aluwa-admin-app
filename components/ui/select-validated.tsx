import React from "react";
import { UseFormRegister } from "react-hook-form";

const Select = ({
  label,
  name,
  options,
  register,
  errors,
  stateError,
  bgColour = "bg-white",
  isPending,
  isRequired,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<any>;
  errors?: any;
  stateError?: any;
  bgColour?: string;
  isPending?: boolean;
  isRequired?: boolean;
}) => {
  const disabledBgColour = "bg-gray-100";

  return (
    <div className="flex flex-col w-full">
      <label className="flex items-center gap-1 font-semibold text-gray-800">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <select
        id={name}
        disabled={isPending}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-turquoise-500 transition ${
          isPending ? disabledBgColour : bgColour
        }`}
        {...register(name)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {(errors?.[name] || stateError?.[name]) && (
        <p className="mt-1 text-sm text-red-500">
          {errors?.[name]?.message || stateError?.[name]}
        </p>
      )}
    </div>
  );
};

export default Select;
