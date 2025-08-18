"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listCategories } from "@/data/category";
import {
  createProductAction,
  getProductAction,
  updateProductAction,
} from "@/actions/product";

type ProductFormProps = {
  productId?: string;
};

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    tags: "",
    images: [],
  });

  useEffect(() => {
    // Load categories
    const fetchCategories = async () => {
      const cats = await listCategories();
      setCategories(cats);
    };

    fetchCategories();

    // If editing, load product data
    if (productId) {
      getProductAction(productId).then((p) => {
        setFormData({
          ...p,
          tags: p.tags.join(", "),
          images: p.images,
        });
      });
    }

    setLoading(false);
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submission = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "tags") submission.append("tags", val);
      else if (key === "images" && Array.isArray(val)) {
        val.forEach((f) => submission.append("image", f));
      } else submission.append(key, val);
    });

    if (productId) {
      await updateProductAction(productId, submission);
    } else {
      await createProductAction(submission);
    }

    router.push("/dashboard/products");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={formData.slug}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      />
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full border border-black px-3 py-2 rounded"
      />
      <input
        type="file"
        multiple
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            images: Array.from(e.target.files || []),
          }))
        }
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        {productId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
