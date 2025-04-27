import styles from './Sidebar.module.css';
import Link from 'next/link';
import HomeIcon from '../Icon/HomeIcon';
import {
  ExploreIcon,
  LikedVideosIcon,
  HistoryIcon,
  LibraryIcon,
  SubscriptionsIcon,
  WatchLaterIcon,
} from '../Icon';

const menuItems = [
  { Icon: HomeIcon, label: 'Home', href: '/' },
  { Icon: ExploreIcon, label: 'Explore', href: '/explore' },
  { Icon: SubscriptionsIcon, label: 'Subscriptions', href: '/subscriptions' },
  { Icon: LibraryIcon, label: 'Library', href: '/library' },
  { Icon: HistoryIcon, label: 'History', href: '/history' },
  { Icon: WatchLaterIcon, label: 'Watch Later', href: '/watch-later' },
  { Icon: LikedVideosIcon, label: 'Liked Videos', href: '/liked-videos' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.menuItem}>
            <item.Icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
