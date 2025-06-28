export interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  name?: string;
  created_at: string;
  tags?: string[];
  like?: number;
  commentsData?: Comment[];
  commentsCount?: number;
}

export interface Comment {
  id: string;
  postId: string;
  comment: string;
  created_at: string;
  author?: string;
}

export interface CommentFormData {
  id: string;
  postId: string;
  content: string;
  username: string;
  created_at: string;
}

export interface AddCommentResult {
  success?: boolean;
  comment?: Comment;
  error?: string;
}

export interface SinglePostViewProps {
  post: Post;
  user: {
    id: string;
    email?: string;
  };
}
