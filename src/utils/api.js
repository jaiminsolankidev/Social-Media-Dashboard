import api from '../services/api';
import { postService } from '../services/postService';
import { userService } from '../services/userService';
import { notificationService } from '../services/notificationService';
import { messageService } from '../services/messageService';

/**
 * Universal API utility wrapper for data fetching and mutations.
 * Connects directly to the central Axios client and services layer.
 */
export const getPosts = () => postService.getPosts();
export const getPostById = (id) => postService.getPostById(id);
export const createPost = (data) => postService.createPost(data);
export const toggleLikePost = (postId, userId) => postService.toggleLike(postId, userId);
export const deletePost = (postId) => postService.deletePost(postId);

export const getUsers = () => userService.getUsers();
export const getUserById = (id) => userService.getUserById(id);
export const getUserByUsername = (username) => userService.getUserByUsername(username);
export const updateUserProfile = (userId, data) => userService.updateProfile(userId, data);

export const getNotifications = (userId) => notificationService.getNotifications(userId);
export const markNotificationRead = (id) => notificationService.markAsRead(id);
export const markAllNotificationsRead = (userId) => notificationService.markAllAsRead(userId);

export const getConversations = (userId) => messageService.getConversations(userId);
export const sendMessage = (conversationId, message) => messageService.sendMessage(conversationId, message);

export default api;
