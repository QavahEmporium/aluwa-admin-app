import React from "react";
import { UseFormRegister } from "react-hook-form";

const Textarea = ({
  label,
  name,
  placeholder,
  register,
  errors,
  stateError,
  bgColour,
  isPending,
  isRequired,
  rows,
}: {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors?: any;
  stateError?: any;
  bgColour?: string;
  isPending?: boolean;
  isRequired?: boolean;
  rows?: number;
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

      <textarea
        id={name}
        placeholder={placeholder}
        className={`border border-black px-3 py-2 rounded w-full ${
          isPending ? disabledBgColour : bgColour
        } focus:inset-ring-transparent`}
        disabled={isPending}
        rows={rows || 4}
        {...register(name)}
      />

      {errors && errors[name] && (
        <span className="text-pinklet-500">{errors[name]?.message}</span>
      )}
      {stateError && (
        <span className="text-pinklet-500">{stateError[name]}</span>
      )}
    </div>
  );
};

export default Textarea;
