import { API_URLS, DEFAULT_IMAGES } from '@/constants';
import { formatDate, formatDuration } from '@/utils/formatters';

interface DailymotionVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_720_url: string;
  owner?: {
    username?: string;
    id?: string;
  };
  created_time: number;
  views_total: number;
  duration: number;
}

interface DailymotionApiResponse<T> {
  list: T[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelAvatar: string;
  channelId: string;
  viewCount: number;
  publishedAt: string;
  duration: string;
}

export interface Comment {
  id: string;
  text: string;
  authorName: string;
  authorAvatar: string;
  date: string;
}

export async function fetchPopularVideos(): Promise<Video[]> {
  try {
    const response = await fetch(
      `${API_URLS.DAILYMOTION}/videos?fields=id,title,description,thumbnail_720_url,owner.username,owner.id,created_time,views_total,duration&tags=news&sort=recent`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data: DailymotionApiResponse<DailymotionVideo> =
      await response.json();

    return Promise.all(
      data.list.map(async (item) => {
        const channelAvatar = await fetchChannelInfo(
          item.owner?.id || 'unknown'
        );
        return {
          id: item.id,
          title: item.title,
          description: item.description || '',
          thumbnailUrl: item.thumbnail_720_url || DEFAULT_IMAGES.THUMBNAIL,
          channelTitle: item.owner?.username || 'Unknown Channel',
          channelAvatar,
          channelId: item.owner?.id || 'unknown',
          viewCount: item.views_total,
          publishedAt: formatDate(item.created_time),
          duration: formatDuration(item.duration),
        };
      })
    );
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function fetchVideoById(id: string): Promise<Video | null> {
  try {
    const response = await fetch(
      `${API_URLS.DAILYMOTION}/video/${id}?fields=id,title,description,thumbnail_720_url,owner.username,owner.id,created_time,views_total,duration`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    const item: DailymotionVideo = await response.json();
    const channelAvatar = await fetchChannelInfo(item.owner?.id || 'unknown');
    return {
      id: item.id,
      title: item.title,
      description: item.description || '',
      thumbnailUrl: item.thumbnail_720_url || DEFAULT_IMAGES.THUMBNAIL,
      channelTitle: item.owner?.username || 'Unknown Channel',
      channelAvatar,
      channelId: item.owner?.id || 'unknown',
      viewCount: item.views_total,
      publishedAt: formatDate(item.created_time),
      duration: formatDuration(item.duration),
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

export async function fetchComments(videoId: string): Promise<Comment[]> {
  try {
    const response = await fetch(
      `${API_URLS.DAILYMOTION}/video/${videoId}/comments?fields=id,message,created_time,owner.username,owner.avatar_120_url&limit=50`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const data: DailymotionApiResponse<{
      id: string;
      message: string;
      created_time: number;
      owner: {
        username: string;
        avatar_120_url: string;
      };
    }> = await response.json();

    return data.list.map(({ id, message, created_time, owner }) => ({
      id,
      text: message,
      authorName: owner.username,
      authorAvatar: owner.avatar_120_url,
      date: formatDate(created_time),
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export const fetchChannelInfo = async (channelId: string): Promise<string> => {
  try {
    const response = await fetch(
      `${API_URLS.DAILYMOTION}/user/${channelId}?fields=avatar_120_url`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch channel info');
    }

    const data = await response.json();
    return data.avatar_120_url || DEFAULT_IMAGES.AVATAR;
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return DEFAULT_IMAGES.AVATAR;
  }
};
