import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import styles from './NotFound.module.css';

/**
 * 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Sorry, this page isn&apos;t available.</h1>
      <p className={styles.description}>
        The link you followed may be broken, or the page may have been removed. Go back to VYBE Home.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
