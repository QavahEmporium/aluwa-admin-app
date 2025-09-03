"use client";
import { resetPassword } from "@/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast("Password mismatch", {
        description: "The passwords do not match.",
      });
      return;
    }

    try {
      await resetPassword(form.password);
      toast("Password updated", {
        description: "Your password has been reset successfully.",
      });
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (error) {
      toast("Error", {
        description: "Something went wrong while resetting password.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-700">Reset Password</h2>
      <div className="relative">
        <label className="block text-sm text-gray-600">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 pr-10"
          placeholder="Enter new password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <div className="relative">
        <label className="block text-sm text-gray-600">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 pr-10"
          placeholder="Confirm new password"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-rose-bud-400"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
