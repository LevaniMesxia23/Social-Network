import { redirect } from "next/navigation";
import { createServerSupabase } from "@/utils/supabase/server";

interface RouteProtectionProps {
  children: React.ReactNode;
  redirectTo?: string;
  protectFrom?: "authenticated" | "unauthenticated";
}

export default async function RouteProtection({
  children,
  redirectTo = "/",
  protectFrom = "authenticated",
}: RouteProtectionProps) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (protectFrom === "authenticated" && user) {
    redirect(redirectTo);
  }

  if (protectFrom === "unauthenticated" && !user) {
    redirect("/login");
  }

  return <>{children}</>;
}
