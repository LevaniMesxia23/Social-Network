import { getSinglePost } from "@/services/posts/apiPosts";
import { getComments } from "@/services/comments/apiComments";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SinglePostView from "./SinglePostView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SinglePostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const [post, commentsData] = await Promise.all([
      getSinglePost(id),
      getComments(id),
    ]);

    const comments =
      commentsData?.map((comment: any) => ({
        id: comment.id,
        postId: comment.postId,
        comment: comment.content,
        author: comment.username,
        created_at: comment.created_at,
      })) || [];

    const postWithComments = {
      ...post,
      commentsData: comments,
      commentsCount: comments.length,
    };

    return <SinglePostView post={postWithComments} user={user} />;
  } catch (error) {
    console.error("Error loading post:", error);
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Post not found
          </h2>
          <p className="text-slate-600">
            The post you're looking for doesn't exist
          </p>
        </div>
      </main>
    );
  }
}
