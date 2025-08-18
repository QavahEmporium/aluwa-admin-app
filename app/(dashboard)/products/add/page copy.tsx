"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProductAction } from "@/actions/product";
import { listCategories } from "@/data/category";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [status, setStatus] = useState("active");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Load categories
  useState(() => {
    listCategories().then((cats) => setCategories(cats));
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    setImages(selected);
    setImagePreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("status", status);
    formData.append("categoryId", categoryId);
    formData.append("tags", tags);
    images.forEach((file) => formData.append("image", file));

    startTransition(async () => {
      try {
        await createProductAction(formData);
        router.push("/products");
      } catch (err: any) {
        setError(err.message ?? "Failed to create product");
      }
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Add Product</h1>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full"
          required
        />
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border border-black px-3 py-2 rounded w-full md:w-1/2"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="border border-black px-3 py-2 rounded w-full md:w-1/2"
            required
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full md:w-1/2"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full md:w-1/2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-black px-3 py-2 rounded w-full"
        />
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e.target.files)}
          className="border border-black px-3 py-2 rounded w-full"
        />

        {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {imagePreviews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Preview ${i}`}
                className="w-20 h-20 object-cover border border-black rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
        >
          {isPending ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
