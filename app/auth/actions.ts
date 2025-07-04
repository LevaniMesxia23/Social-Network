"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabase } from "@/utils/supabase/server";
import { followUser, unfollowUser } from "@/services/users/apiUsers";

export async function login(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    return { error: "Invalid email or password. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { display_name: data.name },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    return {
      error: error.message || "Failed to create account. Please try again.",
    };
  }

  if (authData.user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ email: data.email, name: data.name }]);

    if (insertError) {
      console.error("Error inserting user data:", insertError);
      return {
        error:
          "Account created but failed to save user data. Please contact support.",
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleFollowUser(targetUserEmail: string) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Authentication required" };
  }

  try {
    await followUser(targetUserEmail, user.email!);
    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    console.error("Follow error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to follow user",
    };
  }
}

export async function handleUnfollowUser(targetUserEmail: string) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Authentication required" };
  }

  try {
    await unfollowUser(targetUserEmail, user.email!);
    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    console.error("Unfollow error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to unfollow user",
    };
  }
}
