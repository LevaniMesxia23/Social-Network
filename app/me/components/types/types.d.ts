interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  name?: string;
  created_at: string;
  tags?: string[];
  likeCount?: number;
  commentsCount?: number;
}

interface PostCardProps {
  post: Post;
  showCommentCount?: boolean;
  isClickable?: boolean;
}