"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const SubmitButton = ({
  name,
  isPending,
}: {
  name: string;
  isPending?: boolean;
}) => {
  return (
    <>
      {isPending ? (
        <button
          type="button"
          disabled={isPending}
          className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
        >
          Saving...
        </button>
      ) : (
        <button
          type="submit"
          disabled={isPending}
          className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
        >
          {name}
        </button>
      )}
    </>
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
