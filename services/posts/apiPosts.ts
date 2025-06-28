import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";
import { deleteComments } from "@/services/comments/apiComments";

export async function getPosts() {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
}

export async function getFollowedUsersPosts(currentUserEmail: string) {
  const supabase = await createServerSupabaseReadOnly();

  try {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("name, followers");

    if (usersError || !users) return [];

    const followedUserNames = users
      .filter(user => user.followers?.includes(currentUserEmail))
      .map(user => user.name)
      .filter(Boolean); 

    if (followedUserNames.length === 0) return [];

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .in("name", followedUserNames)
      .order("created_at", { ascending: false });

    if (postsError) return [];

    return posts || [];
  } catch (error) {
    console.error("Error in getFollowedUsersPosts:", error);
    return [];
  }
}

export async function getSinglePost(id: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getAuthorPosts(name: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("name", name)
    .order("created_at", { ascending: false });
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

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseReadOnly();

  try {
    await deleteComments(id);
    const { data, error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      throw error;
    }
    return { data, error };
  } catch (error) {
    throw error;
  }
}

export async function checkUserLike(postId: string, userEmail: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_email", userEmail);

  return Boolean(data && data.length > 0);
}

export async function togglePostLike(
  postId: string,
  userEmail: string,
  isLiked: boolean
) {
  const supabase = createClient();

  if (isLiked) {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .match({ post_id: postId, user_email: userEmail });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("post_likes")
      .insert({ post_id: postId, user_email: userEmail });
    if (error) throw error;
  }

  return !isLiked;
}

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email || null;
}
