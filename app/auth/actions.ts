"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabase } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    redirect("/login?error=Invalid credentials");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup error:", error);
    redirect("/signup?error=Signup failed");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
