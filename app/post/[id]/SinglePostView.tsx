"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { addComment } from "./actions";

interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  name?: string;
  created_at: string;
  tags?: string[];
  like?: number;
  commentsData?: any[];
  commentsCount?: number;
}

interface Comment {
  id: string;
  postId: string;
  comment: string;
  created_at: string;
  author?: string;
}

interface SinglePostViewProps {
  post: Post;
  user: User;
}

export default function SinglePostView({ post, user }: SinglePostViewProps) {
  const [comments, setComments] = useState<Comment[]>(post.commentsData || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addComment(post.id, newComment.trim());

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success && result.comment) {
        setComments([...comments, result.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to feed
          </Link>
        </div>

        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          {post.image && (
            <div className="relative w-full h-96 overflow-hidden bg-slate-50">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-slate-700 text-lg leading-relaxed">
                {post.description}
              </p>
            </header>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold">
                      {post.name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {post.name || "Anonymous"}
                    </p>
                    <time
                      className="text-slate-500 text-sm"
                      dateTime={post.created_at}
                    >
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>

              {post.tags &&
                Array.isArray(post.tags) &&
                post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

              <footer className="flex items-center space-x-6 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-slate-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{post.like || 0}</span>
                </div>

                <div className="flex items-center space-x-2 text-slate-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{comments.length}</span>
                </div>
              </footer>
            </div>
          </div>
        </article>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Comments ({comments.length})
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-4 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
  
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={comment.id || index}
                  className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-xs">
                        {comment.author?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium text-slate-900">
                          {comment.author || "Anonymous"}
                        </p>
                        <span className="text-slate-500 text-sm">
                          {new Date(comment.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-slate-700">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
