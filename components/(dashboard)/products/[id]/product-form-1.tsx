"use client";

import { useState } from "react";

interface ProductFormProps {
  product?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || "",
    imageUrl: product?.imageUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          className="w-full border border-black rounded px-3 py-2"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          className="w-full border border-black rounded px-3 py-2"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full border border-black rounded px-3 py-2"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full border border-black rounded px-3 py-2"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          type="text"
          name="category"
          className="w-full border border-black rounded px-3 py-2"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          className="w-full border border-black rounded px-3 py-2"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover border border-black"
          />
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
