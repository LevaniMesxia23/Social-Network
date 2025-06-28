import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

export async function getUser(userId: string) {
  const supabase = await createServerSupabaseReadOnly();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);
  if (!data) {
    return [];
  }
  if (error) {
    throw error;
  }

  return data;
}
