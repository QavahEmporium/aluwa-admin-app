import { verifySession } from "@/lib/dal";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function updateUser(input: any) {
  await connectDB();
  const session = await verifySession();
  if (!session) return null;

  const userId = session?.userId as string;
  return User.findByIdAndUpdate(userId, input, { new: true });
}
