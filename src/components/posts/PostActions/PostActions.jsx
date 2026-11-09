import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { shareContent } from '../../../utils/helpers';
import { useToast } from '../../common/Toast/Toast';
import styles from './PostActions.module.css';

/**
 * Action buttons row for Like, Comment, Share, and Save
 */
export default function PostActions({
  isLiked = false,
  isSaved = false,
  onToggleLike,
  onToggleSave,
  onCommentClick,
  post,
}) {
  const { showToast } = useToast();

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/#post-${post?.id || ''}`;
    const result = await shareContent({
      title: 'VYBE Post',
      text: post?.caption || 'Check out this post on VYBE!',
      url: postUrl,
    });

    if (result === 'copied') {
      showToast('Post link copied to clipboard!', 'success');
    }
  };

  return (
    <div className={styles.actionsBar}>
      <div className={styles.leftGroup}>
        {/* Like */}
        <button
          type="button"
          className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
          onClick={onToggleLike}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <Heart
            size={24}
            fill={isLiked ? 'var(--color-error)' : 'none'}
            stroke={isLiked ? 'var(--color-error)' : 'currentColor'}
          />
        </button>

        {/* Comment */}
        <button
          type="button"
          className={styles.actionButton}
          onClick={onCommentClick}
          aria-label="View comments"
        >
          <MessageCircle size={24} />
        </button>

        {/* Share */}
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleShare}
          aria-label="Share post"
        >
          <Send size={23} />
        </button>
      </div>

      {/* Save */}
      <button
        type="button"
        className={`${styles.actionButton} ${isSaved ? styles.saved : ''}`}
        onClick={onToggleSave}
        aria-label={isSaved ? 'Unsave post' : 'Save post'}
      >
        <Bookmark
          size={24}
          fill={isSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      </button>
    </div>
  );
}
