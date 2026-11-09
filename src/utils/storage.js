/**
 * Safe wrapper around localStorage operations
 */
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage key "${key}":`, error);
      return false;
    }
  },

  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
      return false;
    }
  },
};
