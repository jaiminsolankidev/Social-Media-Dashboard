import { useState, useMemo } from 'react';
import PostHeader from '../PostHeader/PostHeader';
import PostMedia from '../PostMedia/PostMedia';
import PostActions from '../PostActions/PostActions';
import PostCaption from '../PostCaption/PostCaption';
import CommentSection from '../CommentSection/CommentSection';
import { useAuth } from '../../../hooks/useAuth';
import styles from './PostCard.module.css';

/**
 * Reusable PostCard combining header, media, actions, caption, and comments
 */
export default function PostCard({
  post,
  author,
  onToggleLike,
  onDeletePost,
}) {
  const { currentUser, toggleSavePost } = useAuth();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const isLiked = useMemo(() => {
    return Boolean(currentUser?.id && post?.likes?.includes(currentUser.id));
  }, [post?.likes, currentUser?.id]);

  const isSaved = useMemo(() => {
    return Boolean(currentUser?.savedPosts?.includes(post?.id));
  }, [currentUser?.savedPosts, post?.id]);

  const isOwnPost = currentUser?.id === post?.userId;

  const handleLikeClick = () => {
    if (onToggleLike) {
      onToggleLike(post.id);
    }
  };

  const handleSaveClick = () => {
    if (toggleSavePost) {
      toggleSavePost(post.id);
    }
  };

  return (
    <article className={styles.card} id={`post-${post.id}`} aria-label={`Post by ${author?.username || 'user'}`}>
      <PostHeader
        post={post}
        author={author}
        isOwn={isOwnPost}
        onDeletePost={onDeletePost}
      />

      <PostMedia
        src={post.image}
        alt={post.caption || 'Post image'}
        onDoubleTap={handleLikeClick}
      />

      <PostActions
        isLiked={isLiked}
        isSaved={isSaved}
        onToggleLike={handleLikeClick}
        onToggleSave={handleSaveClick}
        onCommentClick={() => setIsCommentsOpen((prev) => !prev)}
        post={post}
      />

      <PostCaption
        likesCount={post.likes?.length || 0}
        authorUsername={author?.username || 'user'}
        caption={post.caption}
        hashtags={post.hashtags}
      />

      <CommentSection
        postId={post.id}
        isExpanded={isCommentsOpen}
        onToggleExpand={() => setIsCommentsOpen((prev) => !prev)}
      />
    </article>
  );
}
