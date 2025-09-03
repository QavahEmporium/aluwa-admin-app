"use client";
import { updateProfile } from "@/actions/auth";
import React, { useState } from "react";
import { toast } from "sonner";

const UpdateProfile = ({
  user,
}: {
  user: { name: string; email: string } | null;
}) => {
  const [form, setForm] = useState({
    name: user?.name,
    email: user?.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name: form.name, email: form.email });

    toast("Profile updated", {
      description: "Your profile details were saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSaveProfile} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Update Details</h2>
      <div>
        <label className="block text-sm text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-turquoise-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
