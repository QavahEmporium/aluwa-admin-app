"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    isPublished: boolean;
    imageUrl: string;
  };
  setDeleteId: (id: string) => void;
  setImageUrl: (id: string) => void;
};

const ProductCard = ({
  product,
  setDeleteId,
  setImageUrl,
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      key={product.id}
      className="border border-gray-200 shadow-sm p-4 rounded-xl flex flex-col gap-4 bg-white"
    >
      {/* Top Section with Image + Info */}
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg border border-gray-200" />
          )}

          <Image
            src={`/api/files/${product.imageUrl}`}
            alt={product.name}
            fill
            className={`object-cover rounded-lg border border-gray-200 transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-base line-clamp-1">
                {product.name}
              </div>
              <div className="text-sm text-gray-600">{product.category}</div>
            </div>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setDeleteId(product.id);
                    setImageUrl(product.imageUrl);
                  }}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <div className="font-bold mt-1">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Stock: {product.stock}</div>
            <span
              className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                product.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {product.isPublished ? "Published" : "Unpublished"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
