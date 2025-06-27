export const dashboardIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

export const profileIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const postsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);

export const likesIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const commentsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8l4-4v4z"
    />
  </svg>
);

export const followersIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const stats = [
  {
    label: "Total Posts",
    value: "24",
    icon: postsIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Total Likes",
    value: "1.2K",
    icon: likesIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Comments",
    value: "89",
    icon: commentsIcon,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Followers",
    value: "456",
    icon: followersIcon,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export const actionCards = [
  {
    title: "Dashboard",
    description: "View your stats and activity",
    href: "/me/dashboard",
    icon: dashboardIcon,
    color: "bg-blue-100",
    stats: [
      { label: "Total Posts", value: "24" },
      { label: "Total Likes", value: "1.2K" },
      { label: "Followers", value: "456" },
    ],
  },
  {
    title: "Profile",
    description: "Edit your personal information",
    href: "/me/profile",
    icon: profileIcon,
    color: "bg-green-100",
    stats: [
      { label: "Username", value: "@johndoe" },
      { label: "Email", value: "john.doe@example.com" },
      { label: "Member since", value: "Jan 2024" },
    ],
  },
];
