import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

/**
 * Custom VYBE brand wordmark and logo component
 */
export default function Logo({ showText = true, className = '' }) {
  return (
    <Link to="/" className={`${styles.logoContainer} ${className}`} aria-label="VYBE Home">
      <div className={styles.icon}>
        <span>V</span>
      </div>
      {showText && (
        <span className={styles.text}>
          VYBE<span className={styles.textDot}>.</span>
        </span>
      )}
    </Link>
  );
}
