// src/models/User.ts
import { IUser } from "@/definitions/user";
import mongoose, { Schema, Document, Model } from "mongoose";

interface UserDocument extends Document, IUser {
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    authType: { type: String, default: "credentials" },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
