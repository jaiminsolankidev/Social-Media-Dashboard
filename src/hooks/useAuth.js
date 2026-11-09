import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication state and operations
 */
export function useAuth() {
  return useAuthContext();
}
