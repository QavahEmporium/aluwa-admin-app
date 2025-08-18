"use client";

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
