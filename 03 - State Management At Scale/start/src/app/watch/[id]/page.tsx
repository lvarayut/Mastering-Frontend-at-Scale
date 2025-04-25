import { notFound } from 'next/navigation';
import { fetchVideoById, fetchPopularVideos } from '@/services/video';

import WatchPage from './components/WatchPage';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const video = await fetchVideoById(resolvedParams.id);

  if (!video) {
    notFound();
  }

  return <WatchPage video={video} />;
}

export async function generateStaticParams() {
  const videos = await fetchPopularVideos();
  return videos.map((video) => ({
    id: video.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const video = await fetchVideoById(resolvedParams.id);

  if (!video) {
    return {
      title: 'Video not found',
      description: 'The requested video could not be found.',
    };
  }

  return {
    title: video.title,
    description: video.description,
  };
}
