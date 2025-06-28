import { getComments } from "@/services/comments/apiComments";
import { getFollowedUsersPosts } from "@/services/posts/apiPosts";
import PostCard from "@/app/me/components/ui/PostCard";
import { getAllUsers, checkIfFollowing } from "@/services/users/apiUsers";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CollapsibleUserSidebar, MobileSidebarTrigger } from "./sidebar";

interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  followers?: string[];
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

    const posts = await getFollowedUsersPosts(currentUser.email!);
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
        <CollapsibleUserSidebar
          users={usersWithFollowStatus}
          currentUserEmail={currentUser.email!}
        />

        <main className="flex-1">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-12">
            <header className="mb-8 sm:mb-12 text-center">
              <h1 className="text-2xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
                Your Feed
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Stay updated with posts from people you follow
              </p>
            </header>

            {posts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-2">
                  No posts from followed users
                </h3>
                <p className="text-slate-500 text-sm sm:text-base">
                  Follow some users from the sidebar to see their posts here
                </p>
              </div>
            ) : (
              <section
                className="space-y-6 sm:space-y-8 pb-20 sm:pb-8"
                aria-label="Posts feed"
              >
                {postsWithComments.map((post) => (
                  <PostCard key={post.id} post={post} showCommentCount={true} />
                ))}
              </section>
            )}

            <MobileSidebarTrigger
              users={usersWithFollowStatus}
              currentUserEmail={currentUser.email!}
            />
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
