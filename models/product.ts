// src/models/Product.ts
import { IProduct } from "@/definitions/product";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Category from "@/models/category"; // 👈 ensures schema is registered

interface ProductDocument
  extends Document,
    Omit<IProduct, "categoryId" | "id"> {
  categoryId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: Category.modelName,
      required: true,
      index: true,
    },
    isPublished: { type: Boolean, default: false }, // 👈 new field
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: 1 });

const Product: Model<ProductDocument> =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
