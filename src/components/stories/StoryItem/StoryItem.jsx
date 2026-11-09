import { Plus } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import styles from './StoryItem.module.css';

/**
 * Single Story circle with avatar, seen/unseen ring, and username
 */
export default function StoryItem({
  story,
  author,
  isOwn = false,
  isSeen = false,
  onClick,
  onAddStory,
}) {
  const username = isOwn ? 'Your story' : author?.username || 'User';

  return (
    <button
      type="button"
      className={styles.item}
      onClick={isOwn && !story ? onAddStory : onClick}
      aria-label={`View story from ${username}`}
    >
      <div style={{ position: 'relative' }}>
        <Avatar
          src={author?.avatar}
          alt={author?.name || username}
          name={author?.name}
          size="lg"
          hasStory={Boolean(story)}
          storySeen={isSeen}
        />
        {isOwn && !story && (
          <div className={styles.addBadge}>
            <Plus size={14} strokeWidth={3} />
          </div>
        )}
      </div>
      <span className={styles.username}>{username}</span>
    </button>
  );
}
