import { deleteCategoryAction } from "@/actions/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditCategoryModal from "./edit-category-modal";

export const CategoryCard = ({ cat }: { cat: any }) => {
  const route = useRouter();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await deleteCategoryAction(id);
    route.refresh();
  };

  return (
    <div className="border border-black p-3 rounded flex justify-between items-center">
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
      <div>
        <div className="font-semibold">{cat.name}</div>
        <div className="text-sm text-gray-600">{cat.description}</div>
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
          onClick={() => handleDelete(cat.id)}
          className="px-2 py-1 border border-black rounded text-xs text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
