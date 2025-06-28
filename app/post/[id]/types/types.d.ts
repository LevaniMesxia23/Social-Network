export interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  name?: string;
  created_at: string;
  tags?: string[];
  like?: number;
  commentsData?: any[];
  commentsCount?: number;
}

export interface Comment {
  id: string;
  postId: string;
  comment: string;
  created_at: string;
  author?: string;
}