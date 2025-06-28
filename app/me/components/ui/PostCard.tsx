"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  checkUserLike,
  togglePostLike,
} from "@/services/posts/apiPosts";

export default function PostCard({
  post,
  showCommentCount = true,
  isClickable = true,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const email = await getCurrentUser();
        setUserEmail(email);

        if (email) {
          const isLiked = await checkUserLike(post.id, email);
          setLiked(isLiked);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    initializeUser();
  }, [post.id]);

  const handleToggleLike = async () => {
    if (!userEmail || isLoading) return;

    setIsLoading(true);
    try {
      const newLikedState = await togglePostLike(post.id, userEmail, liked);
      setLiked(newLikedState);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardContent = (
    <article
      key={post.id}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200"
    >
      {post.image && (
        <div className="relative w-full h-72 overflow-hidden bg-slate-50">
          {isClickable ? (
            <Link href={`/post/${post.id}`} className="block">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                loading="lazy"
              />
            </Link>
          ) : (
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}

      <div className="p-8">
        <header className="mb-6">
          {isClickable ? (
            <Link href={`/post/${post.id}`} className="block">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                {post.title}
              </h2>
            </Link>
          ) : (
            <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">
              {post.title}
            </h2>
          )}
          <p className="text-slate-700 text-base leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </header>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-sm">
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
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>

          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-150"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <footer className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-6">
              <button
                className={`flex items-center space-x-2 transition-colors duration-150 group ${
                  liked
                    ? "text-red-500 hover:text-red-600"
                    : "text-slate-500 hover:text-red-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`${liked ? "Unlike" : "Like"} post`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLike();
                }}
                disabled={isLoading || !userEmail}
              >
                <svg
                  className={`w-5 h-5 group-hover:scale-110 transition-transform duration-150 ${
                    liked ? "fill-current" : ""
                  }`}
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={liked ? 0 : 2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2 text-slate-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {showCommentCount ? post.commentsCount || 0 : "Comments"}
                </span>
              </div>
            </div>

            <button
              className="text-slate-400 hover:text-slate-600 transition-colors duration-150"
              aria-label="Share post"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </footer>
        </div>
      </div>
    </article>
  );

  return cardContent;
}
