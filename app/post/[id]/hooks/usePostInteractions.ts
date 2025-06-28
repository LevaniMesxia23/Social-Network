import { useState, useEffect } from "react";
import {
  getCurrentUser,
  checkUserLike,
  togglePostLike,
} from "@/services/posts/apiPosts";

interface UsePostInteractionsProps {
  postId: string;
}

interface UsePostInteractionsReturn {
  liked: boolean;
  userEmail: string | null;
  isLikeLoading: boolean;
  handleToggleLike: () => Promise<void>;
}

export function usePostInteractions({
  postId,
}: UsePostInteractionsProps): UsePostInteractionsReturn {
  const [liked, setLiked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const email = await getCurrentUser();
        setUserEmail(email);

        if (email) {
          const isLiked = await checkUserLike(postId, email);
          setLiked(isLiked);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    initializeUser();
  }, [postId]);

  const handleToggleLike = async () => {
    if (!userEmail || isLikeLoading) return;

    setIsLikeLoading(true);
    try {
      const newLikedState = await togglePostLike(postId, userEmail, liked);
      setLiked(newLikedState);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  return {
    liked,
    userEmail,
    isLikeLoading,
    handleToggleLike,
  };
}
