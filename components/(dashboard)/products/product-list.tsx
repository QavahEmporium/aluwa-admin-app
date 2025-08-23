"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { deleteProductAction } from "@/actions/product";
import DeleteProductModal from "./delete-product-modal";
import { Product } from "@/definitions/product";
import Pagination from "@/components/ui/pagination";
import ProductCard from "./product-card";
import TableRow from "./table-row";

interface CategoryOption {
  label: string;
  value: string;
}

export default function ProductListPage({
  cats,
  prods,
}: {
  cats: CategoryOption[];
  prods: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(prods);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset on search
          }}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // reset on category change
          }}
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

      {/* Pagination */}
      <div className="md:hidden mb-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setDeleteId={setDeleteId}
            setImageUrl={setImageUrl}
          />
        ))}
      </div>

      {/* Desktop table */}
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
            {paginatedProducts.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                setDeleteId={setDeleteId}
                setImageUrl={setImageUrl}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
