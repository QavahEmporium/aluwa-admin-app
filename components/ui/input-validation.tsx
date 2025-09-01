// /components/InputValidated.tsx
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputValidatedProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isPending: boolean;
  stateError?: Record<string, string[]>;
}

const InputValidated = ({
  name,
  type,
  label,
  placeholder,
  register,
  errors,
  isPending,
  stateError,
}: InputValidatedProps) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        disabled={isPending}
        placeholder={placeholder}
        {...register(name)}
        className="mt-1 block w-full border border-black rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
      {stateError?.[name] && (
        <p className="text-red-500 text-sm mt-1">{stateError[name][0]}</p>
      )}
    </div>
  );
};

export default InputValidated;
