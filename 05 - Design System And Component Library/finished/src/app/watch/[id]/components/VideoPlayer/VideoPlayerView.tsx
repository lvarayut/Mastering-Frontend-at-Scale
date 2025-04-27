'use client';

import styles from './VideoPlayer.module.css';

interface VideoPlayerViewProps {
  isLoading: boolean;
  playerUrl: string;
  title: string;
}

export default function VideoPlayerView({
  isLoading,
  playerUrl,
  title,
}: VideoPlayerViewProps) {
  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner} />
        </div>
      )}
      <iframe
        className={styles.player}
        src={playerUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
