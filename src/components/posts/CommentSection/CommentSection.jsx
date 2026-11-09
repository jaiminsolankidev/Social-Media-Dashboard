import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { commentService } from '../../../services/commentService';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../hooks/useAuth';
import { formatRelativeTime } from '../../../utils/formatDate';
import styles from './CommentSection.module.css';

/**
 * Expandable comments list with new comment creation and deletion
 */
export default function CommentSection({
  postId,
  isExpanded = false,
  onToggleExpand,
}) {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchCommentsAndUsers() {
      try {
        const [commentList, userList] = await Promise.all([
          commentService.getCommentsByPostId(postId),
          userService.getUsers(),
        ]);
        if (isMounted) {
          setComments(commentList);
          setUsers(userList);
        }
      } catch (err) {
        console.warn('Error fetching comments:', err);
      }
    }
    fetchCommentsAndUsers();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !currentUser?.id) return;

    setSubmitting(true);
    const commentData = {
      postId,
      userId: currentUser.id,
      text: newCommentText.trim(),
    };

    try {
      const created = await commentService.createComment(commentData);
      setComments((prev) => [...prev, created]);
      setNewCommentText('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    try {
      await commentService.deleteComment(commentId);
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const commentsCount = comments.length;

  return (
    <div className={styles.container}>
      {/* Toggle View comments button */}
      {commentsCount > 0 && (
        <button
          type="button"
          className={styles.viewAllButton}
          onClick={onToggleExpand}
        >
          {isExpanded
            ? 'Hide comments'
            : `View all ${commentsCount} ${commentsCount === 1 ? 'comment' : 'comments'}`}
        </button>
      )}

      {/* Visible Comments List */}
      {isExpanded && commentsCount > 0 && (
        <div className={styles.commentsList}>
          {comments.map((comment) => {
            const author = users.find((u) => u.id === comment.userId);
            const isOwnComment = comment.userId === currentUser?.id;

            return (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentContent}>
                  <Link
                    to={`/profile/${author?.username || ''}`}
                    className={styles.commentUser}
                  >
                    {author?.username || 'user'}
                  </Link>
                  <span>{comment.text}</span>
                  <span className={styles.commentTime}>
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>

                {isOwnComment && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteComment(comment.id)}
                    aria-label="Delete your comment"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Comment Input Form */}
      <form className={styles.inputForm} onSubmit={handleAddComment}>
        <input
          ref={inputRef}
          type="text"
          className={styles.inputField}
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          aria-label="Add a comment"
        />
        <button
          type="submit"
          className={styles.postButton}
          disabled={!newCommentText.trim() || submitting}
        >
          Post
        </button>
      </form>
    </div>
  );
}
