import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

export async function getComments(postId: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postId", postId);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteComments(postId: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("postId", postId);
  if (error) {
    throw error;
  }
  return { data, error };
}

export async function createComment(
  postId: string,
  comment: string,
  user: any
) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("comments")
    .insert({
      postId,
      content: comment,
      username: user.identities?.[0]?.identity_data?.display_name,
    })
    .select()
    .single();

  if (error) {
    console.error("Database error:", error);
    return { error: error.message };
  }

  return { data, error: null };
}
