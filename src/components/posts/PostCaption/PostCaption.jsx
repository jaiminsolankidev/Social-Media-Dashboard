import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCaption.module.css';

/**
 * Likes count, author caption, and hashtags
 */
export default function PostCaption({
  likesCount = 0,
  authorUsername = '',
  caption = '',
  hashtags = [],
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongCaption = caption.length > 120;
  const displayedCaption =
    !isExpanded && isLongCaption ? `${caption.slice(0, 120)}...` : caption;

  return (
    <div className={styles.container}>
      {/* Likes */}
      <div className={styles.likesCount}>
        {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
      </div>

      {/* Caption */}
      {caption && (
        <div className={styles.captionText}>
          <Link
            to={`/profile/${authorUsername}`}
            className={styles.authorUsername}
          >
            {authorUsername}
          </Link>
          <span>{displayedCaption}</span>
          {!isExpanded && isLongCaption && (
            <button
              type="button"
              className={styles.moreButton}
              onClick={() => setIsExpanded(true)}
            >
              more
            </button>
          )}
        </div>
      )}

      {/* Hashtags */}
      {hashtags?.length > 0 && (
        <div className={styles.hashtags}>
          {hashtags.map((tag) => (
            <Link
              key={tag}
              to={`/explore?q=%23${tag}`}
              className={styles.hashtagLink}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
