"use client";

import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

type Option = { value: string; label: string };

type FormFieldProps = {
  type?: "text" | "number" | "password" | "textarea" | "select" | "file";
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
  rows?: number; // for textarea
  options?: Option[]; // for select
};

const FormField = ({
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
  bgColour,
  isPending,
  isRequired,
  min,
  max,
  rows,
  options,
}: FormFieldProps) => {
  const disabledBgColour = "bg-gray-100";
  const [isShow, setIsShow] = useState(false);
  const [typeName, setTypeName] = useState(type);

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            className={`border border-black px-3 py-2 rounded w-full ${
              isPending ? disabledBgColour : bgColour
            } focus:inset-ring-transparent`}
            disabled={isPending}
            rows={rows || 4}
            {...register(name)}
          />
        );
      case "select":
        return (
          <select
            className={`border border-black px-3 py-2 rounded w-full ${
              isPending ? disabledBgColour : bgColour
            } focus:inset-ring-transparent`}
            disabled={isPending}
            {...register(name)}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "file":
        return (
          <input
            type="file"
            className={`border border-black px-3 py-2 rounded w-full ${
              isPending ? disabledBgColour : bgColour
            } focus:inset-ring-transparent`}
            disabled={isPending}
            {...register(name)}
          />
        );
      default:
        return (
          <div className="flex items-center gap-2">
            {iconUrl && (
              <Image src={iconUrl} height={23} width={23} alt={label} />
            )}
            {isPhoneNumber && <div className="text-turquoise-900">+27</div>}

            <input
              type={typeName === "password" && !isShow ? "password" : typeName}
              placeholder={placeholder}
              className={`border border-black px-3 py-2 rounded w-full ${
                isPending ? disabledBgColour : bgColour
              } focus:inset-ring-transparent`}
              disabled={isPending}
              {...register(
                name,
                typeName === "number" ? { valueAsNumber: true } : {}
              )}
              min={min || undefined}
              max={max || undefined}
            />

            {isPassword &&
              (isShow ? (
                <EyeOff
                  className="text-turquoise-900"
                  onClick={() => setIsShow(false)}
                />
              ) : (
                <Eye
                  className="text-turquoise-900"
                  onClick={() => setIsShow(true)}
                />
              ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mb-1">
        <label className="font-mono text-turquoise-900" htmlFor={name}>
          {label}
        </label>
        {isRequired && <span className="font-mono text-pinklet-500">*</span>}
      </div>

      {renderField()}

      {errors && errors[name] && (
        <span className="text-pinklet-500">{errors[name]?.message}</span>
      )}
      {stateError && (
        <span className="text-pinklet-500">{stateError[name]}</span>
      )}
    </div>
  );
};

export default FormField;
