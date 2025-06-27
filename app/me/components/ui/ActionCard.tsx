import Link from "next/link";

interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  stats: Array<{ label: string; value: string }>;
  color: string;
}

export default function ActionCard({
  title,
  description,
  href,
  icon,
  stats,
  color,
}: ActionCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-lg shadow-md p-6 h-full transition-all duration-200 group-hover:shadow-lg group-hover:scale-105">
        <div className="flex items-center mb-4">
          <div className={`p-3 ${color} rounded-lg`}>
            <div className="w-8 h-8">{icon}</div>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">{stat.label}</span>
              <span className="font-medium text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>
        <div
          className={`mt-4 flex items-center ${
            color.includes("blue") ? "text-blue-600" : "text-green-600"
          } text-sm font-medium`}
        >
          View {title}
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
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
        </div>
      </div>
    </Link>
  );
}
