export const API_URLS = {
  DAILYMOTION: 'https://api.dailymotion.com',
  YOUTUBE: 'https://www.googleapis.com/youtube/v3',
} as const;

export const DEFAULT_IMAGES = {
  AVATAR: '/default/default-avatar.svg',
  THUMBNAIL: '/images/thumbnails/default-thumbnail.svg',
} as const;

export const VIDEO_PLAYER_CONFIG = {
  AUTOPLAY: 0,
  MUTE: 0,
  CONTROLS: 1,
  QUEUE_ENABLE: 0,
  QUEUE_AUTOPLAY_NEXT: 0,
} as const;

export const TIME_FORMATS = {
  DAYS_IN_WEEK: 7,
  DAYS_IN_MONTH: 30,
  DAYS_IN_YEAR: 365,
} as const;

export const VIEW_COUNT_THRESHOLDS = {
  MILLION: 1000000,
  THOUSAND: 1000,
} as const;

export const API_ENDPOINTS = {
  VIDEOS: '/api/videos',
  CHANNELS: '/api/channels',
  COMMENTS: '/api/comments',
  USERS: '/api/users',
} as const;

export const ROUTES = {
  HOME: '/',
  WATCH: '/watch',
  CHANNEL: '/channel',
  SEARCH: '/search',
  UPLOAD: '/upload',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
