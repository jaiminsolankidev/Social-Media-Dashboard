import { useState } from 'react';
import styles from './Post.module.css';

/**
 * Interactive Social Media Post component.
 * Demonstrates:
 * - useState hook for dynamic data (likes, like toggle, comment list, active comment input, share status)
 * - Comment system with live adding/rendering
 * - Responsive layout styled via CSS Modules
 *
 * @param {Object} props
 * @param {Object} props.post
 * @param {Function} [props.onLike] - Optional external like handler
 * @param {Function} [props.onComment] - Optional external comment handler
 * @param {Function} [props.onShare] - Optional external share handler
 */
export default function Post({ post, onLike, onComment, onShare }) {
  // Normalize post fields to support multiple data structures
  const initialLikes = Array.isArray(post?.likes)
    ? post.likes.length
    : typeof post?.likes === 'number'
    ? post.likes
    : 0;

  const authorName = post?.author?.name || post?.author?.username || post?.user?.name || 'Anonymous User';
  const authorAvatar =
    post?.author?.avatar ||
    post?.user?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`;
  const postTime = post?.time || post?.createdAt || 'Just now';
  const postContent = post?.content || post?.caption || '';
  const postImage = post?.image || null;

  // State management
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(Boolean(post?.isLiked));
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [shareFeedback, setShareFeedback] = useState(false);

  // Like / Unlike handler
  const handleLike = () => {
    const updatedLiked = !isLiked;
    const updatedCount = updatedLiked ? likes + 1 : Math.max(0, likes - 1);
    setLikes(updatedCount);
    setIsLiked(updatedLiked);

    if (onLike) {
      onLike(post?.id, updatedLiked, updatedCount);
    }
  };

  // Comment submission handler
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: 'You',
      text: newComment.trim(),
      time: 'Just now',
    };

    setComments((prev) => [...prev, commentObj]);
    setNewComment('');

    if (onComment) {
      onComment(post?.id, commentObj);
    }
  };

  // Share handler
  const handleShare = async () => {
    if (onShare) {
      onShare(post);
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${authorName}`,
          text: postContent,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    } catch {
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <article className={styles.post} aria-label={`Post by ${authorName}`}>
      <div className={styles.postHeader}>
        <img
          src={authorAvatar}
          alt={authorName}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.headerInfo}>
          <h3 className={styles.authorName}>{authorName}</h3>
          <p className={styles.postTime}>{postTime}</p>
        </div>
      </div>

      {postContent && <p className={styles.content}>{postContent}</p>}

      {postImage && (
        <div className={styles.imageWrapper}>
          <img
            src={postImage}
            alt="Post content"
            className={styles.postImage}
            loading="lazy"
          />
        </div>
      )}

      <div className={styles.postActions}>
        <button
          type="button"
          onClick={handleLike}
          className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <span className={styles.actionIcon}>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments((prev) => !prev)}
          className={styles.actionButton}
          aria-label="Toggle comments"
        >
          <span className={styles.actionIcon}>💬</span>
          <span>
            {comments.length > 0 ? `${comments.length} Comments` : 'Comment'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className={styles.actionButton}
          aria-label="Share post"
        >
          <span className={styles.actionIcon}>↪️</span>
          <span>{shareFeedback ? 'Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Interactive Comment System */}
      {showComments && (
        <div className={styles.commentSection}>
          {comments.length > 0 ? (
            <ul className={styles.commentList}>
              {comments.map((comment, index) => (
                <li key={comment.id || index} className={styles.commentItem}>
                  <strong>{comment.author || comment.user || 'User'}: </strong>
                  <span>{comment.text || comment.content}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyComments}>No comments yet. Be the first to comment!</p>
          )}

          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className={styles.commentInput}
              aria-label="Write a comment"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={styles.commentSubmitBtn}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
