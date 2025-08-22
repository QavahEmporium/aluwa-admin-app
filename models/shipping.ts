// src/models/ShippingAddress.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ShippingAddressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ShippingAddressSchema = new Schema<ShippingAddressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const ShippingAddress: Model<ShippingAddressDocument> =
  mongoose.models.ShippingAddress ||
  mongoose.model<ShippingAddressDocument>(
    "ShippingAddress",
    ShippingAddressSchema
  );

export default ShippingAddress;
