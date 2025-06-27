"use server";

import { createComment } from "@/services/comments/apiComments";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface CommentData {
  id: string;
  postId: string;
  content: string;
  username: string;
  created_at: string;
}

export async function addComment(postId: string, comment: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  try {
    const result = await createComment(postId, comment, user);

    if (result?.error) {
      return { error: result.error };
    }

    if (!result?.data) {
      return { error: "Failed to create comment - no data returned" };
    }

    const data = result.data as CommentData;

    revalidatePath(`/post/${postId}`);

    return {
      success: true,
      comment: {
        id: data.id,
        postId: data.postId,
        comment: data.content,
        author: data.username,
        created_at: data.created_at,
      },
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: "Failed to create comment" };
  }
}
