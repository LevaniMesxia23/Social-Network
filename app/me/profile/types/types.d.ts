export interface ActivityOverviewProps {
  postsCount: number;
  followersCount: number;
  accountAge: number;
}

interface AccountDetailsProps {
  user: {
    id: string;
    email?: string;
    identities?: Array<{
      identity_data?: {
        display_name?: string;
      };
    }>;
  };
}

interface ProfileHeaderProps {
  user: {
    id: string;
    email?: string;
    identities?: Array<{
      identity_data?: {
        display_name?: string;
      };
    }>;
  };
}

interface ProfileStatsProps {
  postsCount: number;
  followersCount: number;
  memberSince: string;
}