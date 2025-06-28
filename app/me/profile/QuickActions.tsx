import Link from "next/link";
import { DrawerDemo } from "../components/ui/Drawer";
import { quickActions } from "@/lib/quickActions";

export default function QuickActions() {
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <DrawerDemo />
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href="/me/posts"
            className="flex flex-col items-center p-4 text-center hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
