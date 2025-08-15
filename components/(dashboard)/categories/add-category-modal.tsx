"use client";
import { createNewCategory } from "@/actions/category";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddCategoryModal({
  open,
  onClose,
}: AddCategoryModalProps) {
  const [name, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const route = useRouter();

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the backdrop (outer div) is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createNewCategory({ name, description });
    setNewCategory("");
    setDescription("");
    onClose();
    route.refresh();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-6 rounded w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setNewCategory(e.target.value)}
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
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
