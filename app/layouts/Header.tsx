import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";

async function Header() {
  const supabase = await createServerSupabaseReadOnly();
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
            {user && (
              <> 
              <Link href="/me">
              <button className=" text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium cursor-pointer">
                Profile
              </button>
            </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="bg-slate-100 px-4 py-2 rounded-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium cursor-pointer"
                >
                  Sign out
                </button>
              </form>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
