'use client';

import type { Video } from '@/services/video';

import CommentsSectionView from './CommentsSectionView';
import { useComments } from '../../hooks/useComments';

interface CommentsSectionProps {
  video: Video;
}

export default function CommentsSection({ video }: CommentsSectionProps) {
  const { comments, isLoading, error } = useComments(video.id);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  return <CommentsSectionView comments={comments} />;
}
