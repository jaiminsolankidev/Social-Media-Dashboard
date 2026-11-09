import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Send,
  Play,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import Avatar from '../../components/common/Avatar/Avatar';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import api from '../../services/api';
import { userService } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { shareContent } from '../../utils/helpers';
import { useToast } from '../../components/common/Toast/Toast';
import styles from './Reels.module.css';

/**
 * Reels video feed with playback controls, likes, and creator details
 */
export default function Reels() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [reels, setReels] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    async function loadReels() {
      setLoading(true);
      try {
        const [reelsRes, usersData] = await Promise.all([
          api.get('/reels'),
          userService.getUsers(),
        ]);
        setReels(reelsRes.data || []);
        setUsers(usersData || []);
      } catch (err) {
        console.warn('Failed to load reels:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReels();
  }, []);

  const currentReel = reels[currentIndex];
  const creator = users.find((u) => u.id === currentReel?.userId);

  const isLiked = currentReel?.likes?.includes(currentUser?.id);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleLike = async () => {
    if (!currentUser?.id || !currentReel) return;
    const userId = currentUser.id;
    const currentlyLiked = currentReel.likes?.includes(userId);

    const newLikes = currentlyLiked
      ? currentReel.likes.filter((id) => id !== userId)
      : [...(currentReel.likes || []), userId];

    setReels((prev) =>
      prev.map((r) => (r.id === currentReel.id ? { ...r, likes: newLikes } : r))
    );

    try {
      await api.patch(`/reels/${currentReel.id}`, { likes: newLikes });
    } catch (err) {
      console.warn('Failed to update reel like:', err);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/reels`;
    const res = await shareContent({
      title: 'VYBE Reel',
      text: currentReel?.caption || 'Check out this Reel on VYBE!',
      url: shareUrl,
    });
    if (res === 'copied') {
      showToast('Reel link copied to clipboard!', 'success');
    }
  };

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  };

  if (loading) {
    return <Loader size="lg" text="Loading Reels..." />;
  }

  if (reels.length === 0) {
    return (
      <EmptyState
        title="No Reels Available"
        description="Check back soon for new short-form creative videos from the community."
      />
    );
  }

  return (
    <div className={styles.container}>
      {currentIndex > 0 && (
        <button
          type="button"
          className={`${styles.navButton} ${styles.navUp}`}
          onClick={handlePrev}
          aria-label="Previous reel"
        >
          <ChevronUp size={28} />
        </button>
      )}

      <div className={styles.reelCard} onClick={togglePlay}>
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          className={styles.video}
          autoPlay
          loop
          playsInline
          muted={false}
        />

        {!isPlaying && (
          <div className={styles.playPauseIndicator}>
            <Play size={36} fill="#FFFFFF" />
          </div>
        )}

        <div className={styles.overlay}>
          <div className={styles.topBar}>
            <span className={styles.reelsTitle}>Reels</span>
          </div>

          <div className={styles.bottomInfo} onClick={(e) => e.stopPropagation()}>
            <div className={styles.authorRow}>
              <Link to={`/profile/${creator?.username || ''}`}>
                <Avatar
                  src={creator?.avatar}
                  alt={creator?.name}
                  name={creator?.name}
                  size="sm"
                />
              </Link>
              <Link
                to={`/profile/${creator?.username || ''}`}
                className={styles.username}
              >
                {creator?.username || 'creator'}
              </Link>
            </div>
            <p className={styles.caption}>{currentReel.caption}</p>
          </div>
        </div>

        <div className={styles.sideActions} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
            onClick={handleToggleLike}
            aria-label={isLiked ? 'Unlike reel' : 'Like reel'}
          >
            <Heart
              size={28}
              fill={isLiked ? 'var(--color-error)' : 'none'}
              stroke={isLiked ? 'var(--color-error)' : '#FFFFFF'}
            />
            <span className={styles.actionCount}>
              {currentReel.likes?.length || 0}
            </span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            aria-label="Reel comments"
            onClick={() => showToast('Comments are active on full post view', 'info')}
          >
            <MessageCircle size={28} />
            <span className={styles.actionCount}>
              {currentReel.commentsCount || 12}
            </span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleShare}
            aria-label="Share reel"
          >
            <Send size={26} />
          </button>
        </div>
      </div>

      {currentIndex < reels.length - 1 && (
        <button
          type="button"
          className={`${styles.navButton} ${styles.navDown}`}
          onClick={handleNext}
          aria-label="Next reel"
        >
          <ChevronDown size={28} />
        </button>
      )}
    </div>
  );
}
