import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";

export async function getUser(userId: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);
  if (!data) {
    return [];
  }
  if (error) {
    throw error;
  }

  return data;
}

export async function getAllUsers() {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function followUser(
  targetUserEmail: string,
  followerEmail: string
) {
  const supabase = createClient();

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("followers")
    .eq("email", targetUserEmail)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const currentFollowers = userData?.followers || [];

  if (currentFollowers.includes(followerEmail)) {
    throw new Error("Already following this user");
  }

  const updatedFollowers = [...currentFollowers, followerEmail];

  const { error: updateError } = await supabase
    .from("users")
    .update({ followers: updatedFollowers })
    .eq("email", targetUserEmail);

  if (updateError) {
    throw updateError;
  }

  return { success: true };
}

export async function unfollowUser(
  targetUserEmail: string,
  followerEmail: string
) {
  const supabase = createClient();

  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("followers")
    .eq("email", targetUserEmail)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const currentFollowers = userData?.followers || [];

  if (!currentFollowers.includes(followerEmail)) {
    throw new Error("Not following this user");
  }

  const updatedFollowers = currentFollowers.filter(
    (email: string) => email !== followerEmail
  );

  const { error: updateError } = await supabase
    .from("users")
    .update({ followers: updatedFollowers })
    .eq("email", targetUserEmail);

  if (updateError) {
    throw updateError;
  }

  return { success: true };
}

export async function checkIfFollowing(
  targetUserEmail: string,
  followerEmail: string
) {
  const supabase = createClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("followers")
    .eq("email", targetUserEmail)
    .single();

  if (error) {
    return false;
  }

  const followers = userData?.followers || [];
  return followers.includes(followerEmail);
}
