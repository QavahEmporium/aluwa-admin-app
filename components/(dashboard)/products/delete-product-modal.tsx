"use client";

import { useState } from "react";

interface DeleteProductModalProps {
  deleteId: string | null;
  imageUrl: string | null;
  setDeleteId: (id: string | null) => void;
  handleDelete: (id: string, imageUrl: string) => void;
}

export default function DeleteProductModal({
  deleteId,
  imageUrl,
  setDeleteId,
  handleDelete,
}: DeleteProductModalProps) {
  if (!deleteId) return null; // 👈 don’t render modal if no deleteId

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="mb-4">Do you want to delete this product?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteId(null)} // 👈 close modal
            className="px-4 py-2 border border-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              deleteId && imageUrl && handleDelete(deleteId, imageUrl)
            } // 👈 delete
            className="px-4 py-2 border border-black rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
