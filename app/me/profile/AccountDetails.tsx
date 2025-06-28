import { AccountDetailsProps } from "./types/types";


export default function AccountDetails({ user }: AccountDetailsProps) {
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Account Details
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-600">Email Address</span>
          <span className="text-gray-900 font-medium">
            {user.email || "Not provided"}
          </span>
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
  );
}
