import React from "react";
import Link from "next/link";
import { getUser } from "@/services/users/apiUsers";
import { createServerSupabaseReadOnly } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAuthorPosts } from "@/services/posts/apiPosts";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userData = await getUser(user.id);
  const postsCount = await getAuthorPosts(
    user.identities?.[0]?.identity_data?.display_name || ""
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/me" className="hover:text-blue-600 transition-colors duration-200">
            My Account
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Profile</span>
        </nav>

        <div className="bg-white border border-gray-200 mb-8">
          <div className="bg-gray-300 h-24"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6">
              <div className="w-24 h-24 bg-white border-2 border-gray-200 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                <div className="w-20 h-20 bg-gray-900 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {(user.identities?.[0]?.identity_data?.display_name || user.email || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  {user.identities?.[0]?.identity_data?.display_name || "User"}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <div className="w-2 h-2 bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{postsCount.length || 0}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Followers</p>
                <p className="text-2xl font-semibold text-gray-900">{userData[0]?.followers_count || 0}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
                    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Email Address</span>
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Username</span>
                <span className="text-gray-900 font-medium">
                  {user.identities?.[0]?.identity_data?.display_name || "Not set"}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Status</span>
                <span className="inline-flex items-center px-2 py-1 text-sm bg-green-50 text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 mr-2"></div>
                  Active
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Account ID</span>
                <span className="text-gray-900 font-mono text-sm bg-gray-50 px-2 py-1 border border-gray-200">
                  {user.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Activity Overview
            </h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Content Created</span>
                  <span className="text-gray-900 font-semibold">{postsCount.length || 0}</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-gray-900 h-2" style={{width: `${Math.min((postsCount.length || 0) * 10, 100)}%`}}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Followers</span>
                  <span className="text-gray-900 font-semibold">{userData[0]?.followers_count || 0}</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-gray-900 h-2" style={{width: `${Math.min((userData[0]?.followers_count || 0) * 5, 100)}%`}}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Account Age</span>
                  <span className="text-gray-900 font-semibold">
                    {Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-gray-900 h-2" style={{width: "60%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
