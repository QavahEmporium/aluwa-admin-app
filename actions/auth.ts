// /actions/auth.ts
"use server";

import { getUser } from "@/data/user";
import { loginUserformSchema, LoginUserState } from "@/definitions/auth";
import { connectDB } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import User from "@/models/user";
import { updateUser } from "@/services/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function loginUser(
  prevState: LoginUserState | undefined,
  formData: FormData
) {
  await connectDB();

  const validatedFields = loginUserformSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: LoginUserState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await getUser({ email });
    if (!user) {
      const state: LoginUserState = {
        errors: { email: ["User does not exists"] },
      };
      return state;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const state: LoginUserState = {
        errors: { password: ["Incorrect password"] },
      };
      return state;
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Error: fetching Something went Wrong:", error);
  }

  redirect("/home?from=login");
}

export async function resetPassword(newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUser({ password: hashedPassword });
}

export async function updateProfile(data: any) {
  await updateUser(data);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
