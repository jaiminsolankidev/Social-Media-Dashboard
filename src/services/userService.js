import api from './api';
import { initialUsers } from '../data/demoData';

export const userService = {
  /**
   * Fetch all users
   */
  async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch {
      return initialUsers;
    }
  },

  /**
   * Fetch user by ID
   */
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch {
      return initialUsers.find((u) => u.id === id) || null;
    }
  },

  /**
   * Fetch user by username
   */
  async getUserByUsername(username) {
    try {
      const response = await api.get('/users', {
        params: { username: username.toLowerCase() },
      });
      return response.data?.[0] || null;
    } catch {
      return (
        initialUsers.find(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        ) || null
      );
    }
  },

  /**
   * Update user details (e.g. bio, name, avatar, location, etc.)
   */
  async updateUser(id, updates) {
    const response = await api.patch(`/users/${id}`, updates);
    return response.data;
  },

  /**
   * Follow a user: updates current user following and target user followers
   */
  async followUser(currentUserId, targetUserId) {
    const [currentUser, targetUser] = await Promise.all([
      userService.getUserById(currentUserId),
      userService.getUserById(targetUserId),
    ]);

    if (!currentUser || !targetUser) {
      throw new Error('User not found.');
    }

    const updatedFollowing = Array.from(
      new Set([...(currentUser.following || []), targetUserId])
    );
    const updatedFollowers = Array.from(
      new Set([...(targetUser.followers || []), currentUserId])
    );

    const [updatedCurrent, updatedTarget] = await Promise.all([
      api.patch(`/users/${currentUserId}`, { following: updatedFollowing }),
      api.patch(`/users/${targetUserId}`, { followers: updatedFollowers }),
    ]);

    return { currentUser: updatedCurrent.data, targetUser: updatedTarget.data };
  },

  /**
   * Unfollow a user
   */
  async unfollowUser(currentUserId, targetUserId) {
    const [currentUser, targetUser] = await Promise.all([
      userService.getUserById(currentUserId),
      userService.getUserById(targetUserId),
    ]);

    if (!currentUser || !targetUser) {
      throw new Error('User not found.');
    }

    const updatedFollowing = (currentUser.following || []).filter(
      (id) => id !== targetUserId
    );
    const updatedFollowers = (targetUser.followers || []).filter(
      (id) => id !== currentUserId
    );

    const [updatedCurrent, updatedTarget] = await Promise.all([
      api.patch(`/users/${currentUserId}`, { following: updatedFollowing }),
      api.patch(`/users/${targetUserId}`, { followers: updatedFollowers }),
    ]);

    return { currentUser: updatedCurrent.data, targetUser: updatedTarget.data };
  },
};
