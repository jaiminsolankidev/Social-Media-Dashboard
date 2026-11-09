import { useState, useEffect, useMemo } from 'react';
import ProfilePostGrid from '../../components/profile/ProfilePostGrid/ProfilePostGrid';
import Modal from '../../components/common/Modal/Modal';
import PostCard from '../../components/posts/PostCard/PostCard';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { postService } from '../../services/postService';
import { userService } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { Bookmark } from 'lucide-react';
import styles from './Saved.module.css';

/**
 * Saved posts collection page
 */
export default function Saved() {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function loadSavedData() {
      setLoading(true);
      try {
        const [postsData, usersData] = await Promise.all([
          postService.getPosts(),
          userService.getUsers(),
        ]);
        setAllPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        console.warn('Error loading saved posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSavedData();
  }, []);

  const savedPosts = useMemo(() => {
    const savedIds = currentUser?.savedPosts || [];
    return allPosts.filter((p) => savedIds.includes(p.id));
  }, [allPosts, currentUser?.savedPosts]);

  const selectedPostAuthor = useMemo(() => {
    return users.find((u) => u.id === selectedPost?.userId);
  }, [users, selectedPost]);

  if (loading) {
    return <Loader size="lg" text="Loading saved posts..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Saved Posts</h1>
        <p className={styles.subtitle}>Only you can see the posts you have saved</p>
      </div>

      {savedPosts.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={36} />}
          title="Save Posts"
          description="Save photos and videos that you want to see again. Tap the bookmark icon below any post to save it here."
        />
      ) : (
        <ProfilePostGrid
          posts={savedPosts}
          onSelectPost={(post) => setSelectedPost(post)}
        />
      )}

      {selectedPost && (
        <Modal
          isOpen={Boolean(selectedPost)}
          onClose={() => setSelectedPost(null)}
          title="Post Details"
        >
          <PostCard post={selectedPost} author={selectedPostAuthor} />
        </Modal>
      )}
    </div>
  );
}
