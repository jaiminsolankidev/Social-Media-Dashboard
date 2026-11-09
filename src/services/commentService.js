import api from './api';

export const commentService = {
  /**
   * Fetch comments for a specific post
   */
  async getCommentsByPostId(postId) {
    try {
      const response = await api.get('/comments', {
        params: { postId },
      });
      return (response.data || []).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } catch {
      return [];
    }
  },

  /**
   * Add a new comment
   */
  async createComment({ postId, userId, text }) {
    const newComment = {
      id: `c_${Date.now()}`,
      postId,
      userId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const response = await api.post('/comments', newComment);
    return response.data;
  },

  /**
   * Delete a comment
   */
  async deleteComment(id) {
    await api.delete(`/comments/${id}`);
    return true;
  },
};
