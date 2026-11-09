import { Link, useNavigate } from 'react-router-dom';
import { Settings, MapPin, Globe, MessageCircle } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import Button from '../../common/Button/Button';
import { messageService } from '../../../services/messageService';
import { useAuth } from '../../../hooks/useAuth';
import styles from './ProfileHeader.module.css';

/**
 * Profile page top header with avatar, stats, bio, and follow/edit actions
 */
export default function ProfileHeader({
  user,
  postsCount = 0,
  isOwn = false,
  isFollowing = false,
  onToggleFollow,
  onOpenEditModal,
}) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!currentUser?.id || !user?.id) return;
    try {
      const conv = await messageService.getOrCreateConversation(currentUser.id, user.id);
      navigate(`/messages?conv=${conv.id}`);
    } catch {
      navigate('/messages');
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Avatar
          src={user?.avatar}
          alt={user?.name || 'Profile'}
          name={user?.name}
          size="xxl"
        />
      </div>

      <div className={styles.info}>
        {/* Username & Action Buttons */}
        <div className={styles.topRow}>
          <h1 className={styles.username}>{user?.username || 'user'}</h1>

          <div className={styles.actionButtons}>
            {isOwn ? (
              <>
                <Button variant="secondary" size="sm" onClick={onOpenEditModal}>
                  Edit Profile
                </Button>
                <Link
                  to="/settings"
                  className={styles.settingsIcon}
                  aria-label="Account Settings"
                >
                  <Button variant="ghost" size="sm">
                    <Settings size={20} />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant={isFollowing ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={onToggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<MessageCircle size={16} />}
                  onClick={handleSendMessage}
                >
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <span className={styles.statItem}>
            <strong className={styles.statNumber}>{postsCount}</strong> posts
          </span>
          <span className={styles.statItem}>
            <strong className={styles.statNumber}>
              {user?.followers?.length || 0}
            </strong>{' '}
            followers
          </span>
          <span className={styles.statItem}>
            <strong className={styles.statNumber}>
              {user?.following?.length || 0}
            </strong>{' '}
            following
          </span>
        </div>

        {/* Bio & Meta */}
        <div className={styles.bioSection}>
          <span className={styles.fullName}>{user?.name}</span>
          {user?.bio && <p className={styles.bioText}>{user.bio}</p>}

          <div className={styles.metaRow}>
            {user?.location && (
              <span className={styles.metaItem}>
                <MapPin size={14} />
                {user.location}
              </span>
            )}
            {user?.website && (
              <span className={styles.metaItem}>
                <Globe size={14} />
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
