import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return data;
}