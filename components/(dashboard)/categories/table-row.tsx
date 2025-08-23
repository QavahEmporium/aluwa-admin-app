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
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
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
        <td className="px-4 py-3">{cat.description}</td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              cat.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {cat.isPublished ? "Published" : "Unpublished"}
          </span>
        </td>
        <td className="py-3 text-center">
          <div className="inline-flex gap-2">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditingCategory(cat);
              }}
              className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => setConfirmPublish(true)}
              className={`px-3 py-1 border border-gray-300 rounded-md text-xs ${
                cat.isPublished
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {cat.isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
