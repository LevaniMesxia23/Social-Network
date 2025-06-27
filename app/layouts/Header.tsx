import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabase } from "@/utils/supabase/server";

async function Header() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/favicon.ico"
                alt="logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              // Show only sign out for logged-in users
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium"
                >
                  Sign out
                </button>
              </form>
            ) : (
              // Show sign in and sign up for logged-out users
              <>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800 hover:scale-105 active:scale-95"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
