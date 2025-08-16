"use client";

import { useState, useRef } from "react";
import { updateCategoryAction } from "@/actions/category";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  category: { id: string; name: string; description: string };
  onClose: () => void;
  onUpdated?: () => void;
}

export default function EditCategoryModal({
  open,
  category,
  onClose,
  onUpdated,
}: Props) {
  const route = useRouter();
  const [name, setName] = useState(category?.name);
  const [isPending, setIsPending] = useState(false);
  const [description, setDescription] = useState(category?.description);

  const backdropRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateCategoryAction(category.id, { name, description });
      route.refresh();
      onUpdated?.();
      onClose(); // ✅ Close modal after success
    } finally {
      setIsPending(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose(); // ✅ Close modal when clicking backdrop
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white p-6 rounded w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black px-3 py-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-black px-3 py-2 rounded"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
