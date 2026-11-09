import { useNotificationsContext } from '../context/NotificationContext';

/**
 * Custom hook for accessing notification state and methods
 */
export function useNotifications() {
  return useNotificationsContext();
}
