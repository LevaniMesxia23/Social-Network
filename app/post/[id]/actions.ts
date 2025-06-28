"use server";

import { createComment } from "@/services/comments/apiComments";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CommentFormData, AddCommentResult, Comment } from "./types/types";

function validateComment(comment: string): string | null {
  const trimmedComment = comment.trim();

  if (trimmedComment.length < 1) {
    return "Comment cannot be empty";
  }

  if (trimmedComment.length > 1000) {
    return "Comment cannot exceed 1000 characters";
  }

  return null;
}

function transformCommentData(data: CommentFormData): Comment {
  return {
    id: data.id,
    postId: data.postId,
    comment: data.content,
    author: data.username,
    created_at: data.created_at,
  };
}

export async function addComment(
  postId: string,
  comment: string
): Promise<AddCommentResult> {
  const validationError = validateComment(comment);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated" };
  }

  try {
    const result = await createComment(postId, comment.trim(), user);

    if (result?.error) {
      return { error: result.error };
    }

    if (!result?.data) {
      return { error: "Failed to create comment - no data returned" };
    }

    const commentData = transformCommentData(result.data as CommentFormData);

    revalidatePath(`/post/${postId}`);

    return {
      success: true,
      comment: commentData,
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: "Failed to create comment. Please try again." };
  }
}
