import { getComments } from "@/services/comments/apiComments";
import { getPosts } from "@/services/posts/apiPosts";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FeedPage from "./feed/page";

export default async function HomePage() {
  const supabase = await createServerSupabaseReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <FeedPage />;
}
