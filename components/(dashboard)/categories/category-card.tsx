"use client";

import {
  deleteCategoryAction,
  togglePublishCategoryAction,
} from "@/actions/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditCategoryModal from "./edit-category-modal";
import { ConfirmActionModal } from "./confirm-action-modal";

export const CategoryCard = ({ cat }: { cat: any }) => {
  const route = useRouter();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteCategoryAction(id);
    route.refresh();
  };

  const handleTogglePublish = async (id: string) => {
    await togglePublishCategoryAction(id);
    route.refresh();
  };

  return (
    <div className="border border-black p-3 rounded flex justify-between items-center">
      {editingCategory && (
        <EditCategoryModal
          open={showEditModal}
          category={editingCategory}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => console.log("Category updated")}
        />
      )}

      <div>
        <div className="font-semibold">{cat.name}</div>
        <div className="text-sm text-gray-600">{cat.description}</div>
        <div className="text-xs mt-1">
          {cat.isPublished ? (
            <span className="text-green-600">Published</span>
          ) : (
            <span className="text-gray-500">Unpublished</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setShowEditModal(true);
            setEditingCategory(cat);
          }}
          className="px-2 py-1 border border-black rounded text-xs"
        >
          Edit
        </button>

        <button
          onClick={() => setConfirmDelete(true)}
          className="px-2 py-1 border border-black rounded text-xs text-red-600"
        >
          Delete
        </button>

        <button
          onClick={() => setConfirmPublish(true)}
          className={`px-2 py-1 border border-black rounded text-xs ${
            cat.isPublished
              ? "bg-yellow-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {cat.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>

      {/* Delete confirmation */}
      <ConfirmActionModal
        open={confirmDelete}
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        confirmClassName="bg-red-600 text-white"
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => handleDelete(cat.id)}
      />

      {/* Publish confirmation */}
      <ConfirmActionModal
        open={confirmPublish}
        message={`Do you want to ${
          cat.isPublished ? "unpublish" : "publish"
        } this category?`}
        confirmText={cat.isPublished ? "Unpublish" : "Publish"}
        confirmClassName={`${
          cat.isPublished ? "bg-yellow-500" : "bg-green-600"
        } text-white`}
        onClose={() => setConfirmPublish(false)}
        onConfirm={() => handleTogglePublish(cat.id)}
      />
    </div>
  );
};
