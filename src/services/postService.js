import api from './api';
import { initialPosts } from '../data/demoData';

export const postService = {
  /**
   * Fetch all posts sorted by creation date descending
   */
  async getPosts() {
    try {
      const response = await api.get('/posts');
      // Sort newest first
      return (response.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } catch {
      return [...initialPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  },

  /**
   * Fetch single post by ID
   */
  async getPostById(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch {
      return initialPosts.find((p) => p.id === id) || null;
    }
  },

  /**
   * Create a new post
   */
  async createPost(postData) {
    const newPost = {
      id: `p_${Date.now()}`,
      userId: postData.userId,
      image: postData.image,
      caption: postData.caption || '',
      hashtags: postData.hashtags || [],
      location: postData.location || '',
      likes: [],
      createdAt: new Date().toISOString(),
    };

    const response = await api.post('/posts', newPost);
    return response.data;
  },

  /**
   * Update post caption or details
   */
  async updatePost(id, updates) {
    const response = await api.patch(`/posts/${id}`, updates);
    return response.data;
  },

  /**
   * Delete post
   */
  async deletePost(id) {
    await api.delete(`/posts/${id}`);
    return true;
  },

  /**
   * Like post: adds userId to likes array
   */
  async likePost(postId, userId) {
    const post = await postService.getPostById(postId);
    if (!post) throw new Error('Post not found.');

    const currentLikes = post.likes || [];
    if (!currentLikes.includes(userId)) {
      const updatedLikes = [...currentLikes, userId];
      const response = await api.patch(`/posts/${postId}`, { likes: updatedLikes });
      return response.data;
    }
    return post;
  },

  /**
   * Unlike post: removes userId from likes array
   */
  async unlikePost(postId, userId) {
    const post = await postService.getPostById(postId);
    if (!post) throw new Error('Post not found.');

    const updatedLikes = (post.likes || []).filter((id) => id !== userId);
    const response = await api.patch(`/posts/${postId}`, { likes: updatedLikes });
    return response.data;
  },
};
