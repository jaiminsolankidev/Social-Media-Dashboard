import { useState, useEffect } from 'react';
import StoriesList from '../../components/stories/StoriesList/StoriesList';
import PostCard from '../../components/posts/PostCard/PostCard';
import RightSidebar from '../../components/layout/RightSidebar/RightSidebar';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { usePosts } from '../../hooks/usePosts';
import { userService } from '../../services/userService';
import { Image } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Main Home Feed page with Stories, Filter tabs, and Posts
 */
export default function Home() {
  const {
    posts,
    loading,
    feedFilter,
    setFeedFilter,
    toggleLike,
    deletePost,
    refreshPosts,
  } = usePosts();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadUsers() {
      try {
        const data = await userService.getUsers();
        if (isMounted) setUsers(data);
      } catch (err) {
        console.warn('Error fetching users:', err);
      }
    }
    loadUsers();

    // Listen to global post creation events to auto-refresh
    const handleNewPost = () => {
      refreshPosts();
    };
    window.addEventListener('vybe_post_created', handleNewPost);

    return () => {
      isMounted = false;
      window.removeEventListener('vybe_post_created', handleNewPost);
    };
  }, [refreshPosts]);

  return (
    <div className={styles.container}>
      <div className={styles.feedArea}>
        {/* Top Stories Carousel */}
        <StoriesList />

        {/* Feed Filter Tabs */}
        <div className={styles.tabsHeader} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={feedFilter === 'forYou'}
            className={`${styles.tab} ${feedFilter === 'forYou' ? styles.activeTab : ''}`}
            onClick={() => setFeedFilter('forYou')}
          >
            For You
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={feedFilter === 'following'}
            className={`${styles.tab} ${feedFilter === 'following' ? styles.activeTab : ''}`}
            onClick={() => setFeedFilter('following')}
          >
            Following
          </button>
        </div>

        {/* Loading / Posts / Empty states */}
        {loading ? (
          <Loader size="lg" text="Loading your feed..." />
        ) : posts.length === 0 ? (
          <EmptyState
            icon={<Image size={32} />}
            title="No Posts Yet"
            description={
              feedFilter === 'following'
                ? 'Follow other creators to see their latest photographs and updates in your Following feed.'
                : 'Be the first to share your world! Click Create to publish a post.'
            }
          />
        ) : (
          <div className={styles.postsList}>
            {posts.map((post) => {
              const author = users.find((u) => u.id === post.userId);
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={author}
                  onToggleLike={toggleLike}
                  onDeletePost={deletePost}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Right Contextual Sidebar for Desktop */}
      <RightSidebar />
    </div>
  );
}
