import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

export async function getComments(postId: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase.from("comments").select("*").eq("postId", postId);
  if (error) {
    throw error;
  }
  return data;
}