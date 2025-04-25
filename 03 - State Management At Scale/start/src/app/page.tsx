'use client';
import { useCallback, useEffect, useState } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';

import { fetchPopularVideos, fetchChannelInfo } from '@/services/video';
import { Video } from '@/services/video';

import styles from './page.module.css';
export default function Home() {
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
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.videoGrid}>
          {videosWithChannelAvatars.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              channelAvatar={video.channelAvatar}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
