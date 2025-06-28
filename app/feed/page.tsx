import { getComments } from "@/services/comments/apiComments";
import { getPosts } from "@/services/posts/apiPosts";
import PostCard from "@/app/me/components/ui/PostCard";
import { getAllUsers, checkIfFollowing } from "@/services/users/apiUsers";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserCard from "./UserCard";

interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  followers?: string[];
}

function UsersSidebar({
  users,
  currentUserEmail,
}: {
  users: User[];
  currentUserEmail: string;
}) {
  return (
    <aside className="w-80 bg-slate-50 border-r border-slate-200">
      <div className="sticky top-0 h-screen overflow-y-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Community Members
          </h2>
          <p className="text-sm text-slate-600">
            {users.length} active {users.length === 1 ? "member" : "members"}
          </p>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              currentUserEmail={currentUserEmail}
            />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-500">No members found</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default async function FeedPage() {
  try {
    const supabase = await createServerSupabaseReadOnly();
    const {
      data: { user: currentUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !currentUser) {
      redirect("/login");
    }

    const posts = await getPosts();
    const allUsers = await getAllUsers();

    const filteredUsers =
      allUsers?.filter((user) => user.email !== currentUser.email) || [];

    const usersWithFollowStatus = await Promise.all(
      filteredUsers.map(async (user) => {
        try {
          const isFollowing = await checkIfFollowing(
            user.email,
            currentUser.email!
          );
          return {
            ...user,
            isFollowing,
          };
        } catch (error) {
          console.error(
            `Error checking follow status for ${user.email}:`,
            error
          );
          return {
            ...user,
            isFollowing: false,
          };
        }
      })
    );

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        try {
          const comments = await getComments(post.id);
          return {
            ...post,
            commentsData: comments || [],
            commentsCount: comments?.length || 0,
          };
        } catch (error) {
          console.error(`Error fetching comments for post ${post.id}:`, error);
          return {
            ...post,
            commentsData: [],
            commentsCount: 0,
          };
        }
      })
    );

    return (
      <div className="min-h-screen bg-slate-50 flex">
        <UsersSidebar
          users={usersWithFollowStatus}
          currentUserEmail={currentUser.email!}
        />

        <main className="flex-1">
          <div className="container mx-auto max-w-4xl px-6 py-12">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
                Latest Updates
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Stay informed with curated content and insights from our
                community
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
                  No posts available
                </h3>
                <p className="text-slate-500">
                  Check back later for new content
                </p>
              </div>
            ) : (
              <section className="space-y-8" aria-label="Posts feed">
                {postsWithComments.map((post) => (
                  <PostCard key={post.id} post={post} showCommentCount={true} />
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading feed:", error);
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
            Unable to load feed
          </h2>
          <p className="text-slate-600">Please try refreshing the page</p>
        </div>
      </main>
    );
  }
}
