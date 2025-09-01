"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmitButtonProps {
  name: string;
  isPending: boolean;
}

export const SubmitButton = ({ name, isPending }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
    >
      {isPending ? "Loading..." : name}
    </button>
  );
};

export const BackButton = ({ name }: { name: string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black leading-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <h1 className="text-2xl font-bold leading-none">{name}</h1>
    </div>
  );
};
