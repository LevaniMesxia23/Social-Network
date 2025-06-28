interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  isFollowing?: boolean;
}

interface CollapsibleUserSidebarProps {
  users: User[];
  currentUserEmail: string;
}

interface UserCardProps {
  user: User;
  currentUserEmail: string;
}