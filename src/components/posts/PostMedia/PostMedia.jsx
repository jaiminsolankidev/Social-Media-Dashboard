import { useState } from 'react';
import { Heart, ImageOff } from 'lucide-react';
import styles from './PostMedia.module.css';

/**
 * Responsive media image container with double-tap like animation & error fallback
 */
export default function PostMedia({ src, alt = 'Post image', onDoubleTap }) {
  const [hasError, setHasError] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
    if (onDoubleTap) onDoubleTap();
  };

  return (
    <div
      className={styles.mediaContainer}
      onDoubleClick={handleDoubleClick}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <div className={styles.fallback}>
          <ImageOff size={44} />
          <p>Failed to load image</p>
        </div>
      )}

      {showHeart && (
        <div className={styles.heartAnimation} aria-hidden="true">
          <Heart size={90} fill="#FFFFFF" />
        </div>
      )}
    </div>
  );
}
