'use client';

import Image from 'next/image';
import type { Comment } from '@/services/video';

import styles from './CommentsSection.module.css';

interface CommentsSectionViewProps {
  comments: Comment[];
}

export default function CommentsSectionView({
  comments,
}: CommentsSectionViewProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Comments</h2>
      {comments.length === 0 ? (
        <p className={styles.noComments}>No comments yet</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <Image
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  width={40}
                  height={40}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>
                    {comment.authorName}
                  </span>
                  <span className={styles.commentDate}>{comment.date}</span>
                </div>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
