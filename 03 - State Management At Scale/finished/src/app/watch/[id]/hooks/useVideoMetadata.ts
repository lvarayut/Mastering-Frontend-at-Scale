import { Video } from '@/services/video';
import { formatViewCount } from '@/utils/formatters';

interface UseVideoMetadataProps {
  video: Video;
}

interface UseVideoMetadataResult {
  viewCount: string;
  publishedAt: string;
  duration: string;
}

export function useVideoMetadata({
  video,
}: UseVideoMetadataProps): UseVideoMetadataResult {
  return {
    viewCount: formatViewCount(video.viewCount),
    publishedAt: video.publishedAt,
    duration: video.duration,
  };
}
