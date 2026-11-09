import styles from './Loader.module.css';

/**
 * Reusable Loader spinner component
 */
export default function Loader({ size = 'md', text = '', className = '' }) {
  return (
    <div className={`${styles.container} ${className}`} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size] || styles.md}`} />
      {text && <p className={styles.text}>{text}</p>}
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
