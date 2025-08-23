"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import AddCategoryModal from "./add-category-modal";
import EditCategoryModal from "./edit-category-modal";

export default function Categories({ cats }: { cats: any[] }) {
  const [categories, setCategories] = useState<any[]>(cats);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setCategories(cats);
  }, [cats]);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <div className="p-0 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium shadow-sm hover:bg-gray-800 transition"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="block border border-gray-200 shadow-sm p-4 rounded-xl bg-white"
          >
            <div className="font-semibold text-sm">{cat.name}</div>
            <div className="text-sm text-gray-600">{cat.description}</div>
            <div className="flex justify-between items-center mt-3">
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  cat.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {cat.active ? "Active" : "Inactive"}
              </span>
              <button
                onClick={() => {
                  setEditingCategory(cat);
                  setShowEditModal(true);
                }}
                className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No categories found.
          </p>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3">{cat.description}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      cat.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cat.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setShowEditModal(true);
                      }}
                      className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCategories.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            No categories found.
          </p>
        )}
      </div>

      {/* Modals */}
      <AddCategoryModal open={showModal} onClose={() => setShowModal(false)} />
      {editingCategory && (
        <EditCategoryModal
          open={showEditModal}
          category={editingCategory}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
