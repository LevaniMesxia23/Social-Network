import { getAuthorPosts } from "@/services/posts/apiPosts";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import PostCard from "@/app/me/components/ui/PostCard";

async function AuthorPostsPage() {
  const supabase = await createServerSupabaseReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const posts = await getAuthorPosts(
    user?.identities?.[0]?.identity_data?.display_name || ""
  );

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
              <PostCard key={post.id} post={post} showCommentCount={false} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default AuthorPostsPage;
