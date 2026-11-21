import { useState, useEffect } from 'react';

/**
 * Custom React hook to manage state synchronized with localStorage.
 *
 * @param {string} key - localStorage key name
 * @param {any} initialValue - Fallback value if key is not found
 * @returns {[any, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore quota errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
