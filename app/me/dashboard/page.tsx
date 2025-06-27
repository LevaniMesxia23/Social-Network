import React from "react";
import Link from "next/link";
import { Card, StatCard } from "../components";
import { stats } from "../data";

const recentPosts = [
  {
    title: "First blog post",
    time: "Published 2 hours ago",
    color: "border-blue-500",
  },
  {
    title: "Weekend adventures",
    time: "Published 1 day ago",
    color: "border-green-500",
  },
  {
    title: "Tech tips and tricks",
    time: "Published 3 days ago",
    color: "border-purple-500",
  },
];

export default function DashboardPage() {
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

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Create New Post
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                View Analytics
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
