import React from "react";
import Link from "next/link";
import { Card, StatCard } from "../components";
import { stats } from "../data";
import { getPosts } from "@/services/posts/apiPosts";
import { DrawerDemo } from "../components/ui/Drawer";
import { recentPosts, quickActions } from "@/lib/quickActions";

export default async function DashboardPage() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link
            href="/me"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            My Account
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-900 font-medium">Dashboard</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your activity and statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Posts
            </h2>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className={`border-l-4 ${post.color} pl-4`}>
                  <h3 className="text-sm font-medium text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600">{post.time}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2  gap-4">
              <DrawerDemo />
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={action.icon}
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
