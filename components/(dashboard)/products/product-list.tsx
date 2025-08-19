"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteProductAction } from "@/actions/product";
import DeleteProductModal from "./delete-product-modal";

export default function ProductListPage({
  cats,
  prods,
}: {
  cats: any[];
  prods: any[];
}) {
  const [products, setProducts] = useState<any[]>(prods);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setProducts(prods);
  }, [prods]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search, category]);

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteProductAction(id, imageUrl);
      setProducts(products.filter((p) => p.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="All">All Categories</option>
          {cats.map((cat) => (
            <option key={cat.value} value={cat.label}>
              {cat.label}
            </option>
          ))}
        </select>
        <Link
          href="/products/add"
          className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-black p-4 rounded flex flex-col gap-1"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-3">
                <Image
                  src={`/api/files/${product.imageUrl}`}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded border border-black"
                />
                <div className="flex flex-col gap-1">
                  <div className="font-semibold leading-none">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 leading-none">
                    {product.category}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-1">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="border border-black px-2 py-1 rounded text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(product.id)}
                  className="border border-black px-2 py-1 rounded text-xs text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <div className="font-bold">${product.price.toFixed(2)}</div>
              <div className="text-sm">Stock: {product.stock}</div>

              <div className="text-sm">
                Status:{" "}
                {product.isPublished ? (
                  <span className="text-green-600">Published</span>
                ) : (
                  <span className="text-gray-500">Unpublished</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-4 py-2 text-left">Image</th>
              <th className="border border-black px-4 py-2 text-left">Name</th>
              <th className="border border-black px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-black px-4 py-2 text-left">Price</th>
              <th className="border border-black px-4 py-2 text-left">Stock</th>
              <th className="border border-black px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-black px-4 py-2">
                  <Image
                    src={`/api/files/${product.imageUrl}`}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded border border-black"
                  />
                </td>
                <td className="border border-black px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-black px-4 py-2">
                  {product.category}
                </td>
                <td className="border border-black px-4 py-2">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border border-black px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-black px-4 py-2">
                  {product.isPublished ? (
                    <span className="text-green-600 font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="text-gray-500 font-medium">
                      Unpublished
                    </span>
                  )}
                </td>
                <td className="border border-black px-4 py-2 flex gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="border border-black px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setDeleteId(product.id);
                      setImageUrl(product.imageUrl);
                    }}
                    className="border border-black px-2 py-1 rounded text-xs text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <DeleteProductModal
          deleteId={deleteId}
          imageUrl={imageUrl}
          setDeleteId={setDeleteId}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
