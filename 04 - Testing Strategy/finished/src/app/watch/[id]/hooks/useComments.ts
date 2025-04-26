import { useState, useEffect } from 'react';
import { Comment, fetchComments } from '@/services/video';

interface UseCommentsResult {
  comments: Comment[];
  isLoading: boolean;
  error: Error | null;
}

export function useComments(videoId: string): UseCommentsResult {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadComments() {
      try {
        const fetchedComments = await fetchComments(videoId);
        setComments(fetchedComments);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch comments')
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [videoId]);

  return { comments, isLoading, error };
}
