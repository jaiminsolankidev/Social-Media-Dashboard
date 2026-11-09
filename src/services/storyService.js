import api from './api';
import { initialStories } from '../data/demoData';

export const storyService = {
  /**
   * Fetch all active stories
   */
  async getStories() {
    try {
      const response = await api.get('/stories');
      return response.data || [];
    } catch {
      return initialStories;
    }
  },

  /**
   * Create a new story
   */
  async createStory({ userId, image }) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    const newStory = {
      id: `s_${Date.now()}`,
      userId,
      image,
      viewers: [],
      createdAt: now.toISOString(),
      expiresAt,
    };

    const response = await api.post('/stories', newStory);
    return response.data;
  },

  /**
   * Mark story as viewed by user
   */
  async markStoryAsViewed(storyId, userId) {
    try {
      const response = await api.get(`/stories/${storyId}`);
      const story = response.data;
      if (!story) return null;

      const currentViewers = story.viewers || [];
      if (!currentViewers.includes(userId)) {
        const updated = await api.patch(`/stories/${storyId}`, {
          viewers: [...currentViewers, userId],
        });
        return updated.data;
      }
      return story;
    } catch {
      return null;
    }
  },
};
