import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = await createServerSupabase();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
