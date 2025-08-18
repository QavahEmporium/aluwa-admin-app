import React from "react";
import { UseFormRegister } from "react-hook-form";

const Select = ({
  label,
  name,
  options,
  register,
  errors,
  stateError,
  bgColour,
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
    <div className="flex flex-col">
      <div className="flex gap-1">
        <label className="font-mono text-turquoise-900" htmlFor={name}>
          {label}
        </label>
        {isRequired && <p className="font-mono text-pinklet-500">*</p>}
      </div>

      <select
        id={name}
        className={`border border-black px-3 py-2 rounded w-full ${
          isPending ? disabledBgColour : bgColour
        } focus:inset-ring-transparent`}
        disabled={isPending}
        {...register(name)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {errors && errors[name] && (
        <span className="text-pinklet-500">{errors[name]?.message}</span>
      )}
      {stateError && (
        <span className="text-pinklet-500">{stateError[name]}</span>
      )}
    </div>
  );
};

export default Select;
