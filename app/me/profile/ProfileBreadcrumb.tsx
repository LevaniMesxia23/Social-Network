import Link from "next/link";

export default function ProfileBreadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link
        href="/me"
        className="hover:text-blue-600 transition-colors duration-200"
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
      <span className="text-gray-900 font-medium">Profile</span>
    </nav>
  );
}
