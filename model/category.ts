// src/models/Category.ts
import { ICategory } from "@/definitions/product";
import mongoose, { Schema, Document, Model } from "mongoose";

interface CategoryDocument extends Document, ICategory {
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

CategorySchema.index({ name: "text", description: "text" });

const Category: Model<CategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
