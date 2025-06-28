import { ActivityOverviewProps } from "./types/types";

export default function ActivityOverview({
  postsCount,
  accountAge,
}: ActivityOverviewProps) {
  return (
    <div className="bg-white border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <svg
          className="w-5 h-5 text-gray-600 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Activity Overview
      </h2>

      <div className="space-y-6">
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">Content Created</span>
            <span className="text-gray-900 font-semibold">{postsCount}</span>
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div
              className="bg-gray-900 h-2"
              style={{ width: `${Math.min(postsCount * 10, 100)}%` }}
            ></div>
          </div>
        </div>


        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">Account Age</span>
            <span className="text-gray-900 font-semibold">
              {accountAge} days
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-gray-900 h-2" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
