"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, MoreVertical, Trash2 } from "lucide-react";
import { ConfirmModal } from "./confirm-action-modal";
import {
  deleteProductAction,
  togglePublishProductAction,
} from "@/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OptionMenu = ({
  productId,
  imageUrl,
  isPublished,
}: {
  productId: string;
  imageUrl: string;
  isPublished: boolean;
}) => {
  const route = useRouter();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePublishToggle = async () => {
    try {
      await togglePublishProductAction(productId);
      route.push("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProductAction(productId, imageUrl);
      route.push("/products"); // redirect after delete
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {/* Publish / Unpublish */}
          {isPublished ? (
            <DropdownMenuItem
              onClick={() => setShowUnpublishModal(true)}
              className="flex items-center gap-2 text-yellow-600 focus:text-yellow-600"
            >
              <Globe className="w-4 h-4" />
              Unpublish
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setShowPublishModal(true)}
              className="flex items-center gap-2 text-green-600 focus:text-green-600"
            >
              <Globe className="w-4 h-4" />
              Publish
            </DropdownMenuItem>
          )}

          {/* Delete */}
          <DropdownMenuItem
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Confirm Modals */}
      <ConfirmModal
        open={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={() => handlePublishToggle()}
        title="Publish Product"
        message="Are you sure you want to publish this product?"
      />

      <ConfirmModal
        open={showUnpublishModal}
        onClose={() => setShowUnpublishModal(false)}
        onConfirm={() => handlePublishToggle()}
        title="Unpublish Product"
        message="Are you sure you want to unpublish this product?"
      />

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
};

export default OptionMenu;
