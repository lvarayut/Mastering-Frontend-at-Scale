import { useState, useEffect } from 'react';
import { VIDEO_PLAYER_CONFIG } from '@/constants';

import type { Video } from '@/services/video';

interface UseVideoPlayerProps {
  video: Video;
}

interface UseVideoPlayerResult {
  isLoading: boolean;
  playerUrl: string;
}

const LOADING_TIMEOUT = 1000;

export function useVideoPlayer({
  video,
}: UseVideoPlayerProps): UseVideoPlayerResult {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timer);
  }, [video.id]);

  const playerUrl = `https://www.dailymotion.com/embed/video/${video.id}?autoplay=${VIDEO_PLAYER_CONFIG.AUTOPLAY}&mute=${VIDEO_PLAYER_CONFIG.MUTE}&controls=${VIDEO_PLAYER_CONFIG.CONTROLS}&queue-enable=${VIDEO_PLAYER_CONFIG.QUEUE_ENABLE}&queue-autoplay-next=${VIDEO_PLAYER_CONFIG.QUEUE_AUTOPLAY_NEXT}`;

  return { isLoading, playerUrl };
}
