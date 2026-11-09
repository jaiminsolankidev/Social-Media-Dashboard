import { Heart, MessageCircle } from 'lucide-react';
import styles from './ProfilePostGrid.module.css';

/**
 * 3-Column responsive image grid with hover statistics overlay
 */
export default function ProfilePostGrid({ posts = [], onSelectPost }) {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={styles.gridItem}
          onClick={() => onSelectPost && onSelectPost(post)}
          role="button"
          tabIndex={0}
          aria-label={`View post: ${post.caption || 'Photo'}`}
        >
          <img
            src={post.image}
            alt={post.caption || 'Profile post'}
            className={styles.image}
            loading="lazy"
          />

          <div className={styles.overlay} aria-hidden="true">
            <span className={styles.statItem}>
              <Heart size={20} fill="#FFFFFF" />
              <span>{post.likes?.length || 0}</span>
            </span>
            <span className={styles.statItem}>
              <MessageCircle size={20} fill="#FFFFFF" />
              <span>{post.commentsCount || 0}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
