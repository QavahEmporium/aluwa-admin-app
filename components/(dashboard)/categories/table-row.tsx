import React, { useState } from "react";
import EditCategoryModal from "./edit-category-modal";
import { deleteCategoryAction } from "@/actions/category";
import { useRouter } from "next/navigation";

export const TableRow = ({ cat }: { cat: any }) => {
  const route = useRouter();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await deleteCategoryAction(id);
    route.refresh();
  };
  return (
    <>
      <tr>
        <td className="border border-black px-4 py-2">
          {cat.name}{" "}
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
          )}
        </td>
        <td className="border border-black px-4 py-2">{cat.description}</td>
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
            onClick={() => handleDelete(cat.id)}
            className="px-2 py-1 border border-black rounded text-xs text-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
