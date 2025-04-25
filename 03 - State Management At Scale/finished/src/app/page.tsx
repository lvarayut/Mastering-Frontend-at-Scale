'use client';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import { fetchPopularVideos, fetchChannelInfo } from '@/services/video';
import { Video } from '@/services/video';
import { useUserStore } from '@/stores/userStore';

const VideoCard = lazy(() => import('@/components/VideoCard'));

import styles from './page.module.css';
export default function Home() {
  const avatarUrl = useUserStore((state) => state.avatarUrl);
  const [videosWithChannelAvatars, setVideosWithChannelAvatars] = useState<
    Video[]
  >([]);

  const fetchVideo = useCallback(async () => {
    const videos = await fetchPopularVideos();
    const videosWithChannelAvatars = await Promise.all(
      videos.map(async (video) => {
        const channelAvatar = await fetchChannelInfo(video.channelId);
        return {
          ...video,
          channelAvatar,
        };
      })
    );
    setVideosWithChannelAvatars(videosWithChannelAvatars);
  }, []);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return (
    <div className={styles.container}>
      <Header avatarUrl={avatarUrl} />
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.videoGrid}>
          {videosWithChannelAvatars.map((video) => (
            <Suspense key={video.id} fallback={<div>Loading...</div>}>
              <VideoCard
                key={video.id}
                video={video}
                channelAvatar={video.channelAvatar}
              />
            </Suspense>
          ))}
        </div>
      </main>
    </div>
  );
}
