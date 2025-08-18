"use client";
import { useState, useMemo, useEffect } from "react";
import AddCategoryModal from "./add-category-modal";
import EditCategoryModal from "./edit-category-modal";
import { TableRow } from "./table-row";
import { CategoryCard } from "./category-card";

export default function Categories({ cats }: { cats: any[] }) {
  const [categories, setCategories] = useState<any[]>(cats);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  useEffect(() => {
    setCategories(cats);
  }, [cats]);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
        >
          + Add Category
        </button>
      </div>
      {/* Mobile View */}
      <div className="space-y-3 md:hidden">
        {filteredCategories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-4 py-2 text-left">Name</th>
              <th className="border border-black px-4 py-2 text-left">Description</th>
              <th className="border border-black px-4 py-2 text-left">Status</th>
              <th className="border border-black px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <TableRow cat={cat} key={cat.id} />
            ))}
          </tbody>
        </table>
      </div>
      <AddCategoryModal open={showModal} onClose={() => setShowModal(false)} />
      {/* Modal */}
      {editingCategory && (
        <EditCategoryModal
          open={showEditModal}
          category={editingCategory}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => {
            console.log("Category updated");
            // router.refresh(); // uncomment if using Next.js server actions
          }}
        />
      )}{" "}
    </>
  );
}
