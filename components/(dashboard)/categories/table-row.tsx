"use client";

import React, { useState } from "react";
import EditCategoryModal from "./edit-category-modal";
import {
  deleteCategoryAction,
  togglePublishCategoryAction,
} from "@/actions/category";
import { useRouter } from "next/navigation";
import { ConfirmActionModal } from "./confirm-action-modal";

export const TableRow = ({ cat }: { cat: any }) => {
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
    <>
      <tr>
        <td className="border border-black px-4 py-2">
          {cat.name}
          {editingCategory && (
            <EditCategoryModal
              open={showEditModal}
              category={editingCategory}
              onClose={() => setShowEditModal(false)}
              onUpdated={() => console.log("Category updated")}
            />
          )}
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
        </td>
        <td className="border border-black px-4 py-2">{cat.description}</td>
        <td className="border border-black px-4 py-2">
          {cat.isPublished ? (
            <span className="text-green-600 text-sm">Published</span>
          ) : (
            <span className="text-gray-500 text-sm">Unpublished</span>
          )}
        </td>
        <td className="border border-black px-4 py-2 flex gap-2">
          <button
            onClick={() => {
              setShowEditModal(true);
              setEditingCategory(cat);
            }}
            className="border border-black px-2 py-1 rounded text-xs"
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
                : "bg-green-500 text-white"
            }`}
          >
            {cat.isPublished ? "Unpublish" : "Publish"}
          </button>
        </td>
      </tr>
    </>
  );
};
