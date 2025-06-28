export interface ActivityOverviewProps {
  postsCount: number;
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
  memberSince: string;
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