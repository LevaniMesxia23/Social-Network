import { ProfileHeaderProps } from "./types/types";

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 mb-8">
      <div className="bg-gray-300 h-24"></div>
      <div className="px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6">
          <div className="w-24 h-24 bg-white border-2 border-gray-200 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
            <div className="w-20 h-20 bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                {(
                  user.identities?.[0]?.identity_data?.display_name ||
                  user.email ||
                  "U"
                )
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {user.identities?.[0]?.identity_data?.display_name || "User"}
            </h1>
            <p className="text-gray-600">{user.email || "No email"}</p>
            <div className="flex items-center justify-center sm:justify-start mt-2">
              <div className="w-2 h-2 bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
