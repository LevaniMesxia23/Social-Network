"use client";

import { useEffect, useState } from "react";
import { getAuthorPosts } from "@/services/posts/apiPosts";
import { createClient } from "@/utils/supabase/client";
import PostCard from "@/app/me/components/ui/PostCard";
import { deletePost } from "@/services/posts/apiPosts";
import { getComments } from "@/services/comments/apiComments";
import { User } from "@supabase/supabase-js";

interface Comment {
  id: string;
  content: string;
  author: string;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  name?: string;
  created_at: string;
  tags?: string[];
  like?: number;
  commentsData?: Comment[];
  commentsCount?: number;
}

function AuthorPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const userPosts = await getAuthorPosts(
          user?.identities?.[0]?.identity_data?.display_name || ""
        );

        const postsWithComments = await Promise.all(
          userPosts.map(async (post) => {
            try {
              const comments = await getComments(post.id);
              return {
                ...post,
                commentsData: comments || [],
                commentsCount: comments?.length || 0,
              };
            } catch (error) {
              console.error(
                `Error fetching comments for post ${post.id}:`,
                error
              );
              return {
                ...post,
                commentsData: [],
                commentsCount: 0,
              };
            }
          })
        );

        setPosts(postsWithComments);
      }
      setLoading(false);
    };

    fetchUserAndPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900"></div>
          <p className="mt-4 text-slate-600">Loading your posts...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
            My Posts
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            View and manage your published content
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No posts yet
            </h3>
            <p className="text-slate-500">
              Start creating content to see it here
            </p>
          </div>
        ) : (
          <section className="space-y-8" aria-label="Your posts">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <PostCard
                  post={post}
                  showCommentCount={true}
                  isClickable={false}
                />
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                  aria-label="Delete post"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default AuthorPostsPage;
