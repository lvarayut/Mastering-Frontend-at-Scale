import Image from 'next/image';
import { SearchIcon, CreateIcon, NotificationIcon } from '../Icon';
import styles from './Header.module.css';

interface HeaderProps {
  avatarUrl: string;
}

export default function Header({ avatarUrl }: HeaderProps) {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <span className={styles.logoText}>MyTube</span>
        </div>
      </div>
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            aria-label="Search"
          />
          <button className={styles.searchButton} aria-label="Search button">
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.iconButton} aria-label="Create">
          <CreateIcon />
        </button>
        <button className={styles.iconButton} aria-label="Notification">
          <NotificationIcon />
        </button>
        <button className={styles.avatarButton} aria-label="User menu">
          <Image
            src={avatarUrl}
            alt="User avatar"
            className={styles.avatar}
            width={32}
            height={32}
          />
        </button>
      </div>
    </header>
  );
}
