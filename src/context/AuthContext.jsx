import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { initialUsers } from '../data/demoData';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from storage or default to demo user Alex Morgan (u1)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = storage.get(STORAGE_KEYS.AUTH_USER);
    if (saved) return saved;
    // Default demo user for seamless internship evaluation
    const defaultUser = initialUsers[0];
    storage.set(STORAGE_KEYS.AUTH_USER, defaultUser);
    return defaultUser;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Synchronize user profile updates
  const refreshUser = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const refreshed = await userService.getUserById(currentUser.id);
      if (refreshed) {
        setCurrentUser(refreshed);
        storage.set(STORAGE_KEYS.AUTH_USER, refreshed);
      }
    } catch {
      // Keep existing state if offline
    }
  }, [currentUser?.id]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.register(userData);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Registration failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateUserProfile = async (updates) => {
    if (!currentUser?.id) return;
    try {
      const updated = await userService.updateUser(currentUser.id, updates);
      setCurrentUser(updated);
      storage.set(STORAGE_KEYS.AUTH_USER, updated);
      return updated;
    } catch (err) {
      console.error('Failed to update profile:', err);
      throw err;
    }
  };

  // Toggle saving a post for the current user
  const toggleSavePost = async (postId) => {
    if (!currentUser) return;
    const currentSaved = currentUser.savedPosts || [];
    const isSaved = currentSaved.includes(postId);
    const newSaved = isSaved
      ? currentSaved.filter((id) => id !== postId)
      : [...currentSaved, postId];

    return updateUserProfile({ savedPosts: newSaved });
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    toggleSavePost,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
