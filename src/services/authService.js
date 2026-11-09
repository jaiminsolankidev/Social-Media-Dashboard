import api from './api';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  /**
   * Demo login: validates email and password against JSON Server
   * Note: This is an educational internship demo implementation.
   */
  async login(email, password) {
    const response = await api.get('/users', {
      params: { email: email.trim().toLowerCase() },
    });

    const user = response.data?.[0];
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    // Save demo user session to localStorage without password
    const safeUser = { ...user };
    delete safeUser.password;
    storage.set(STORAGE_KEYS.AUTH_USER, safeUser);
    return safeUser;
  },

  /**
   * Demo registration: registers new user in JSON Server
   */
  async register({ name, username, email, password }) {
    // Check if username or email already taken
    const existingUsername = await api.get('/users', {
      params: { username: username.trim().toLowerCase() },
    });
    if (existingUsername.data?.length > 0) {
      throw new Error('Username is already taken.');
    }

    const existingEmail = await api.get('/users', {
      params: { email: email.trim().toLowerCase() },
    });
    if (existingEmail.data?.length > 0) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password, // Mock storage only
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=400&q=80`,
      bio: 'Excited to be on VYBE! 🌟',
      website: '',
      location: '',
      followers: [],
      following: [],
      savedPosts: [],
      isPrivate: false,
      createdAt: new Date().toISOString(),
    };

    const response = await api.post('/users', newUser);
    const safeUser = { ...response.data };
    delete safeUser.password;
    storage.set(STORAGE_KEYS.AUTH_USER, safeUser);
    return safeUser;
  },

  /**
   * Retrieve current cached demo user
   */
  getCurrentUser() {
    return storage.get(STORAGE_KEYS.AUTH_USER, null);
  },

  /**
   * Logout current demo user
   */
  logout() {
    storage.remove(STORAGE_KEYS.AUTH_USER);
  },
};
