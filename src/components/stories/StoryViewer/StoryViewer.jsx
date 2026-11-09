import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import { formatRelativeTime } from '../../../utils/formatDate';
import styles from './StoryViewer.module.css';

const STORY_DURATION = 5000; // 5 seconds per story

/**
 * Story viewer modal with timed progress, next/prev navigation, and keyboard control
 */
export default function StoryViewer({
  stories = [],
  users = [],
  initialIndex = 0,
  onClose,
  onStoryViewed,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentStory = stories[currentIndex];
  const storyAuthor = users.find((u) => u.id === currentStory?.userId);

  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Mark story as viewed
  useEffect(() => {
    if (currentStory && onStoryViewed) {
      onStoryViewed(currentStory.id);
    }
  }, [currentStory, onStoryViewed]);

  // Timer loop for progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / STORY_DURATION) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToNext, goToPrev]);

  if (!currentStory) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Story Viewer">
      {/* Outside prev arrow on desktop */}
      {currentIndex > 0 && (
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navPrev}`}
          onClick={goToPrev}
          aria-label="Previous story"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        className={styles.viewerContainer}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div className={styles.progressContainer}>
          {stories.map((s, idx) => (
            <div key={s.id} className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width:
                    idx === currentIndex
                      ? `${progress}%`
                      : idx < currentIndex
                      ? '100%'
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className={styles.header}>
          <div className={styles.authorMeta}>
            <Avatar
              src={storyAuthor?.avatar}
              alt={storyAuthor?.name}
              name={storyAuthor?.name}
              size="sm"
            />
            <span className={styles.authorName}>{storyAuthor?.username || 'User'}</span>
            <span className={styles.time}>
              {formatRelativeTime(currentStory.createdAt)}
            </span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close stories"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tap zones */}
        <div className={styles.tapLeft} onClick={goToPrev} aria-hidden="true" />
        <div className={styles.tapRight} onClick={goToNext} aria-hidden="true" />

        {/* Story Image */}
        <div className={styles.mediaWrapper}>
          <img
            src={currentStory.image}
            alt="Story media"
            className={styles.storyImage}
          />
        </div>
      </div>

      {/* Outside next arrow on desktop */}
      {currentIndex < stories.length - 1 && (
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navNext}`}
          onClick={goToNext}
          aria-label="Next story"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
