import { useState } from "react";
import { Comment } from "../types/types";
import { addComment } from "../actions";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

function formatCommentDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CommentAvatar({ author }: { author?: string }) {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-semibold text-xs">
        {author?.charAt(0).toUpperCase() || "A"}
      </span>
    </div>
  );
}

function CommentForm({
  onSubmit,
  isSubmitting,
  error,
}: {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await onSubmit(newComment.trim());
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
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
  );
}

function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <div
          key={comment.id || index}
          className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0"
        >
          <div className="flex items-start space-x-3">
            <CommentAvatar author={comment.author} />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <p className="font-medium text-slate-900">
                  {comment.author || "Anonymous"}
                </p>
                <span className="text-slate-500 text-sm">
                  {formatCommentDate(comment.created_at)}
                </span>
              </div>
              <p className="text-slate-700">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommentSection({
  postId,
  comments,
  onCommentAdded,
}: CommentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommentSubmit = async (commentText: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addComment(postId, commentText);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success && result.comment) {
        onCommentAdded(result.comment);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Comments ({comments.length})
      </h2>

      <CommentForm
        onSubmit={handleCommentSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />

      <CommentList comments={comments} />
    </div>
  );
}
