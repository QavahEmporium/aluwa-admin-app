import { Toaster } from "sonner";
import ResetPassword from "@/components/(dashboard)/profile/reset-password";
import UpdateProfile from "@/components/(dashboard)/profile/update-profile";
import { getCurrentUser } from "@/data/user";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div className="max-w-2xl mx-auto md:bg-white md:shadow md:rounded-lg md:p-6 p-0 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>

      {/* Update Profile */}
      <UpdateProfile user={user} />

      {/* Reset Password */}
      <ResetPassword />
      <Toaster />
    </div>
  );
}
