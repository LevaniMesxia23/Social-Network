import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAuthorPosts } from "@/services/posts/apiPosts";
import {
  ProfileBreadcrumb,
  ProfileHeader,
  ProfileStats,
  AccountDetails,
  ActivityOverview,
  QuickActions,
} from "./";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const postsCount = await getAuthorPosts(
    user.identities?.[0]?.identity_data?.display_name || ""
  );

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileBreadcrumb />

        <ProfileHeader user={user} />

        <ProfileStats
          user={user}
          postsCount={postsCount.length || 0}
          memberSince={memberSince}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AccountDetails user={user} />

            <ActivityOverview
              postsCount={postsCount.length || 0}
              accountAge={accountAge}
            />
          </div>

          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
