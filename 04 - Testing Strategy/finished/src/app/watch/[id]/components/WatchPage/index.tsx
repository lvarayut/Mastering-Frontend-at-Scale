'use client';

import Image from 'next/image';
import type { Video } from '@/services/video';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useUserStore } from '@/stores/userStore';

import VideoPlayer from '../VideoPlayer';
import CommentsSection from '../CommentsSection';
import styles from '../../page.module.css';

interface WatchPageProps {
  video: Video;
}

export default function WatchPage({ video }: WatchPageProps) {
  const avatarUrl = useUserStore((state) => state.avatarUrl);

  return (
    <div className={styles.layout}>
      <Header avatarUrl={avatarUrl} />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.videoContent}>
          <VideoPlayer video={video} />
          <div className={styles.videoInfo}>
            <h1 className={styles.title}>{video.title}</h1>
            <div className={styles.metadata}>
              <span>{video.viewCount} views</span>
              <span>•</span>
              <span>{video.publishedAt}</span>
            </div>
            <div className={styles.channelInfo}>
              <Image
                src={video.channelAvatar}
                alt={video.channelTitle}
                width={48}
                height={48}
                className={styles.channelAvatar}
              />
              <div>
                <h3 className={styles.channelTitle}>{video.channelTitle}</h3>
                <p className={styles.description}>{video.description}</p>
              </div>
            </div>
          </div>
          <div>
            <CommentsSection video={video} />
          </div>
        </div>
      </div>
    </div>
  );
}
