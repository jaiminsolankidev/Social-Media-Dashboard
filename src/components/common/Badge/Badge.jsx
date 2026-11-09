import styles from './Badge.module.css';

/**
 * Reusable Badge component for notification counters and status indicators
 */
export default function Badge({
  children,
  variant = 'danger',
  dot = false,
  className = '',
}) {
  if (dot) {
    return <span className={`${styles.badge} ${styles.dot} ${styles[variant]} ${className}`} />;
  }

  if (children === 0 || children === '0' || children === null || children === undefined) {
    return null;
  }

  return (
    <span className={`${styles.badge} ${styles[variant] || styles.danger} ${className}`}>
      {children}
    </span>
  );
}
