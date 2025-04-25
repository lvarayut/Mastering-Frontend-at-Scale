'use client';

import type { Video } from '@/services/video';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import VideoPlayerView from './VideoPlayerView';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const { isLoading, playerUrl } = useVideoPlayer({ video });

  return (
    <VideoPlayerView
      isLoading={isLoading}
      playerUrl={playerUrl}
      title={video.title}
    />
  );
}
