import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value by a specified delay
 * @param {any} value
 * @param {number} delay - delay in milliseconds
 * @returns {any} debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
