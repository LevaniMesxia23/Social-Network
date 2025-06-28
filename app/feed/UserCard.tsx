"use client";

import { useState, useTransition } from "react";
import { handleFollowUser, handleUnfollowUser } from "@/app/auth/actions";

export default function UserCard({ user }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [isPending, startTransition] = useTransition();

  const handleFollowClick = () => {
    startTransition(async () => {
      try {
        if (isFollowing) {
          const result = await handleUnfollowUser(user.email);
          if (result.success) {
            setIsFollowing(false);
          } else if (result.error) {
            console.error("Unfollow error:", result.error);
          }
        } else {
          const result = await handleFollowUser(user.email);
          if (result.success) {
            setIsFollowing(true);
          } else if (result.error) {
            console.error("Follow error:", result.error);
          }
        }
      } catch (error) {
        console.error("Follow/Unfollow error:", error);
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm sm:text-base">
              {user.name?.charAt(0).toUpperCase() ||
                user.email?.charAt(0).toUpperCase() ||
                "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 truncate text-sm sm:text-base">
              {user.name || "Anonymous User"}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleFollowClick}
          disabled={isPending}
          className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 flex-shrink-0 min-w-[80px] sm:min-w-[90px] touch-manipulation ${
            isFollowing
              ? "bg-slate-200 hover:bg-slate-300 text-slate-700 active:bg-slate-400"
              : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPending ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}
