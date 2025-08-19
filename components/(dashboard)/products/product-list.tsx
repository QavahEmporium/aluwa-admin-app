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
        (category === "All" || product.category?.name === category) &&
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
    <div className="p-0 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Products</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-black"
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
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center"
        >
          + Add Product
        </Link>
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 shadow-sm p-4 rounded-xl flex flex-col gap-3 bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-row gap-3">
                <Image
                  src={`/api/files/${product.imageUrl}`}
                  alt={product.name}
                  width={60}
                  height={30}
                  className="rounded-md border border-gray-200"
                />
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-600">
                    {product.category}
                  </div>
                  <div className="font-bold mt-1">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                      product.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {product.isPublished ? "Published" : "Unpublished"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="px-3 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(product.id)}
                  className="px-3 py-1 rounded-md border border-red-300 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Image
                    src={`/api/files/${product.imageUrl}`}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md border border-gray-200"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      product.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {product.isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="py-3">
                  <div className="inline-flex gap-2">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="px-3 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteId(product.id);
                        setImageUrl(product.imageUrl);
                      }}
                      className="px-3 py-1 rounded-md border border-red-300 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
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
