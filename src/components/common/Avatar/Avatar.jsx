import { useState } from 'react';
import styles from './Avatar.module.css';

/**
 * Reusable Avatar component with size variations, story rings, and image failure fallbacks
 */
export default function Avatar({
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  hasStory = false,
  storySeen = false,
  className = '',
  onClick,
}) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const containerClasses = [
    styles.avatarContainer,
    styles[size] || styles.md,
    hasStory ? (storySeen ? styles.hasStorySeen : styles.hasStoryUnseen) : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={styles.avatarImage}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className={styles.fallback} aria-label={alt}>
          {getInitials(name || alt)}
        </div>
      )}
    </div>
  );
}
