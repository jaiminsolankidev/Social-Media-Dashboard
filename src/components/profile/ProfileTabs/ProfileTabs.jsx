import { Grid, Bookmark, Tag } from 'lucide-react';
import styles from './ProfileTabs.module.css';

/**
 * Profile navigation tabs (POSTS, SAVED, TAGGED)
 */
export default function ProfileTabs({ activeTab, onSelectTab, showSaved = false }) {
  return (
    <div className={styles.tabsContainer} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'posts'}
        className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
        onClick={() => onSelectTab('posts')}
      >
        <Grid size={15} />
        <span>POSTS</span>
      </button>

      {showSaved && (
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'saved'}
          className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
          onClick={() => onSelectTab('saved')}
        >
          <Bookmark size={15} />
          <span>SAVED</span>
        </button>
      )}

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'tagged'}
        className={`${styles.tab} ${activeTab === 'tagged' ? styles.activeTab : ''}`}
        onClick={() => onSelectTab('tagged')}
      >
        <Tag size={15} />
        <span>TAGGED</span>
      </button>
    </div>
  );
}
