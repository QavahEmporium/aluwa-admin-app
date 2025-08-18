import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type,
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
  const [isShow, setIsShow] = useState(false);
  const [typeName, setTypeName] = useState(type);

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <label className="font-mono text-turquoise-900" htmlFor="">
          {label}
        </label>
        {isRequired && <p className="font-mono text-pinklet-500">*</p>}
      </div>

      <>
        {iconUrl && (
          <Image
            className=""
            src={iconUrl}
            height={23}
            width={23}
            alt={label}
          />
        )}

        {isPhoneNumber && <div className="text-turquoise-900">+27</div>}

        <input
          placeholder={placeholder}
          className={`border border-black px-3 py-2 rounded w-full ${
            isPending ? disabledBgColour : bgColour
          } focus:inset-ring-transparent`}
          type={typeName ? typeName : "text"}
          disabled={isPending}
          {...register(name)}
          min={min ? min : ""}
          max={max ? max : ""}
        />

        {isPassword &&
          (isShow ? (
            <EyeOff
              className="text-turquoise-900"
              onClick={() => {
                setIsShow(false);
                setTypeName("password");
              }}
            />
          ) : (
            <Eye
              className="text-turquoise-900"
              onClick={() => {
                setIsShow(true);
                setTypeName("text");
              }}
            />
          ))}
      </>
      {errors && errors[name] && (
        <span className="text-pinklet-500">{errors[name]?.message}</span>
      )}
      {stateError && (
        <span className="text-pinklet-500">{stateError[name]}</span>
      )}
    </div>
  );
};

export default Input;
