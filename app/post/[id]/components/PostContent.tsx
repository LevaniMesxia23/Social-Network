import { Post } from "../types/types";

interface PostContentProps {
  post: Post;
  liked: boolean;
  isLikeLoading: boolean;
  onToggleLike: () => void;
  userEmail: string | null;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getImageUrl(imageName: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageName}`;
}

function PostImage({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full h-96 overflow-hidden bg-slate-50">
      <img
        src={getImageUrl(image)}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function AuthorAvatar({ name }: { name?: string }) {
  return (
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
      <span className="text-white font-semibold">
        {name?.charAt(0).toUpperCase() || "A"}
      </span>
    </div>
  );
}

function PostTags({ tags }: { tags?: string[] }) {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
        >
          {tag.trim()}
        </span>
      ))}
    </div>
  );
}

function LikeButton({
  liked,
  isLikeLoading,
  onToggleLike,
  userEmail,
}: {
  liked: boolean;
  isLikeLoading: boolean;
  onToggleLike: () => void;
  userEmail: string | null;
}) {
  return (
    <button
      className={`flex items-center space-x-2 transition-colors duration-150 group ${
        liked
          ? "text-red-500 hover:text-red-600"
          : "text-slate-500 hover:text-red-500"
      } ${isLikeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={`${liked ? "Unlike" : "Like"} post`}
      onClick={onToggleLike}
      disabled={isLikeLoading || !userEmail}
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
  );
}

function CommentCount({ count }: { count: number }) {
  return (
    <div className="flex items-center space-x-2 text-slate-500">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">{count}</span>
    </div>
  );
}

export default function PostContent({
  post,
  liked,
  isLikeLoading,
  onToggleLike,
  userEmail,
}: PostContentProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {post.image && <PostImage image={post.image} title={post.title} />}

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
              <AuthorAvatar name={post.name} />
              <div>
                <p className="font-medium text-slate-900">
                  {post.name || "Anonymous"}
                </p>
                <time
                  className="text-slate-500 text-sm"
                  dateTime={post.created_at}
                >
                  {formatDate(post.created_at)}
                </time>
              </div>
            </div>
          </div>

          <PostTags tags={post.tags} />

          <footer className="flex items-center space-x-6 pt-6 border-t border-slate-100">
            <LikeButton
              liked={liked}
              isLikeLoading={isLikeLoading}
              onToggleLike={onToggleLike}
              userEmail={userEmail}
            />
            <CommentCount count={post.commentsData?.length || 0} />
          </footer>
        </div>
      </div>
    </article>
  );
}
