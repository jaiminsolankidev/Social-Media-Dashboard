import { useState, useEffect, useCallback, useMemo } from 'react';
import { postService } from '../services/postService';
import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to manage feed posts, filtering, likes, and mutations
 */
export function usePosts() {
  const { currentUser } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedFilter, setFeedFilter] = useState('forYou'); // 'forYou' | 'following'

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Derived filtered posts based on active tab
  const filteredPosts = useMemo(() => {
    if (feedFilter === 'following') {
      const followingIds = currentUser?.following || [];
      return posts.filter(
        (p) => followingIds.includes(p.userId) || p.userId === currentUser?.id
      );
    }
    return posts;
  }, [posts, feedFilter, currentUser?.following, currentUser?.id]);

  // Toggle like/unlike with optimistic update
  const handleToggleLike = async (postId) => {
    if (!currentUser?.id) return;
    const userId = currentUser.id;

    // Optimistic functional update
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likes?.includes(userId);
          const newLikes = hasLiked
            ? post.likes.filter((id) => id !== userId)
            : [...(post.likes || []), userId];
          return { ...post, likes: newLikes };
        }
        return post;
      })
    );

    try {
      const post = posts.find((p) => p.id === postId);
      const isCurrentlyLiked = post?.likes?.includes(userId);
      if (isCurrentlyLiked) {
        await postService.unlikePost(postId, userId);
      } else {
        await postService.likePost(postId, userId);
      }
    } catch (err) {
      console.error('Failed to sync like with server:', err);
      // Revert on failure
      fetchPosts();
    }
  };

  const handleCreatePost = async (postData) => {
    const newPost = await postService.createPost({
      ...postData,
      userId: currentUser?.id,
    });
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const handleDeletePost = async (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await postService.deletePost(postId);
    } catch (err) {
      console.error('Failed to delete post on server:', err);
      fetchPosts();
    }
  };

  const handleUpdatePost = async (postId, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...updates } : p))
    );
    try {
      await postService.updatePost(postId, updates);
    } catch (err) {
      console.error('Failed to update post:', err);
      fetchPosts();
    }
  };

  return {
    posts: filteredPosts,
    allPosts: posts,
    loading,
    error,
    feedFilter,
    setFeedFilter,
    toggleLike: handleToggleLike,
    createPost: handleCreatePost,
    deletePost: handleDeletePost,
    updatePost: handleUpdatePost,
    refreshPosts: fetchPosts,
  };
}
