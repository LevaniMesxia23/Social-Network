"use client";

import { useState } from "react";
import { Comment, SinglePostViewProps } from "./types/types";
import { usePostInteractions } from "./hooks/usePostInteractions";
import { PostHeader, PostContent, CommentSection } from "./components";

export default function SinglePostView({ post }: SinglePostViewProps) {
  const [comments, setComments] = useState<Comment[]>(post.commentsData || []);

  const { liked, userEmail, isLikeLoading, handleToggleLike } =
    usePostInteractions({ postId: post.id });

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <PostHeader />

        <PostContent
          post={post}
          liked={liked}
          isLikeLoading={isLikeLoading}
          onToggleLike={handleToggleLike}
          userEmail={userEmail}
        />

        <CommentSection
          postId={post.id}
          comments={comments}
          onCommentAdded={handleCommentAdded}
        />
      </div>
    </main>
  );
}
