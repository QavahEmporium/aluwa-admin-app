// src/models/OrderItem.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderItemDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderItemSchema = new Schema<OrderItemDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const OrderItem: Model<OrderItemDocument> =
  mongoose.models.OrderItem ||
  mongoose.model<OrderItemDocument>("OrderItem", OrderItemSchema);

export default OrderItem;
