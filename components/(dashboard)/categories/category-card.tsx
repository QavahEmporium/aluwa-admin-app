"use client";

import {
  deleteCategoryAction,
  togglePublishCategoryAction,
} from "@/actions/category";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import EditCategoryModal from "./edit-category-modal";
import { ConfirmActionModal } from "./confirm-action-modal";
import { MoreVertical, Edit, Trash2, Globe } from "lucide-react";

export const CategoryCard = ({ cat }: { cat: any }) => {
  const route = useRouter();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleDelete = async (id: string) => {
    await deleteCategoryAction(id);
    route.refresh();
  };

  const handleTogglePublish = async (id: string) => {
    await togglePublishCategoryAction(id);
    route.refresh();
  };

  return (
    <div className="block border border-gray-200 shadow-sm p-4 rounded-xl bg-white relative">
      {/* Category Info */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="font-semibold text-base">{cat.name}</div>
          <div className="text-sm text-gray-600">{cat.description}</div>
          <div className="mt-2">
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                cat.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {cat.isPublished ? "Published" : "Unpublished"}
            </span>
          </div>
        </div>

        {/* Dropdown Trigger + Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setEditingCategory(cat);
                  setShowEditModal(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>

              <button
                onClick={() => {
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>

              <button
                onClick={() => {
                  setConfirmPublish(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-700 hover:bg-gray-50"
              >
                <Globe className="w-4 h-4" />{" "}
                {cat.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
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
    </div>
  );
};
