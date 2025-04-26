import Image from 'next/image';
import Link from 'next/link';
import { formatViewCount } from '@/utils/formatters';
import { Video } from '@/services/video';

import styles from './VideoCard.module.css';
interface VideoCardProps {
  video: Video;
  channelAvatar: string;
}

// Helper function to format video metadata
function getVideoMetadata(video: Video) {
  return {
    viewCount: formatViewCount(video.viewCount),
    publishedAt: video.publishedAt,
    duration: video.duration,
  };
}

export default function VideoCard({ video, channelAvatar }: VideoCardProps) {
  const { viewCount, publishedAt, duration } = getVideoMetadata(video);

  return (
    <div className={styles.videoCard}>
      <Link href={`/watch/${video.id}`}>
        <div className={styles.thumbnailContainer}>
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={320}
            height={180}
            className={styles.thumbnail}
          />
          <div className={styles.duration}>{duration}</div>
        </div>
      </Link>
      <div className={styles.videoInfo}>
        <div className={styles.channelAvatar}>
          <Image
            src={channelAvatar}
            alt={video.channelTitle}
            width={36}
            height={36}
          />
        </div>
        <div className={styles.videoDetails}>
          <h3 className={styles.title}>{video.title}</h3>
          <p className={styles.channelName}>{video.channelTitle}</p>
          <div className={styles.metadata}>
            <span>{viewCount}</span>
            <span>•</span>
            <span>{publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
