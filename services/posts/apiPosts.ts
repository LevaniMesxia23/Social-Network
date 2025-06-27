import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getAuthorPosts(name: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("posts").select("*").eq("name", name);
  if (error) {
    throw error;
  }
  return data; 
}

export async function createPost(post: any) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("posts").insert(post);
  if (error) {
    throw error;
  }
  return { data, error };
}
