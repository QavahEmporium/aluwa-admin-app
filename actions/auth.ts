// /actions/auth.ts
"use server";
import { getUser } from "@/data/user";
import { loginUserformSchema, LoginUserState } from "@/definitions/auth";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

/* export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== "admin@example.com" || password !== "password123") {
    return {
      message: "Invalid credentials",
      errors: {
        email: ["Incorrect email or password"],
      },
    };
  }

  return { message: "Login successful", errors: {} };
} */

export async function loginUser(
  prevState: LoginUserState | undefined,
  formData: FormData
) {
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
