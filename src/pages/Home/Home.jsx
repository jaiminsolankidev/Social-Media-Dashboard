import { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Modal from '../../components/common/Modal/Modal';
import { getPosts, createPost, getUserProfile } from '../../utils/api';
import { PlusCircle, Image as ImageIcon, Sparkles } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Home Page - Main social feed view.
 * Demonstrates:
 * - API integration using useEffect
 * - Dynamic post creation using useState and Modal
 * - Filtering and search
 * - Rendering modular Post components
 */
export default function Home({ searchTerm = '' }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('forYou');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New post form state
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch initial posts and user profile
  useEffect(() => {
    let isMounted = true;
    async function loadFeed() {
      try {
        setLoading(true);
        const [postsData, userData] = await Promise.all([
          getPosts(),
          getUserProfile(),
        ]);
        if (isMounted) {
          setPosts(postsData);
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to load feed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeed();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle post creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      const newPost = await createPost({
        content: content.trim(),
        image: imageUrl.trim() || null,
      });

      setPosts((prev) => [newPost, ...prev]);
      setContent('');
      setImageUrl('');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to publish post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter posts by search term
  const filteredPosts = posts.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const matchContent = p.content?.toLowerCase().includes(term);
    const matchAuthor = p.author?.name?.toLowerCase().includes(term);
    return matchContent || matchAuthor;
  });

  return (
    <div className={styles.container}>
      <div className={styles.feedColumn}>
        {/* Quick Post Creator Banner */}
        <div className={styles.composerCard}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user?.name || 'User'}
            className={styles.userAvatar}
          />
          <button
            type="button"
            className={styles.composerPrompt}
            onClick={() => setIsModalOpen(true)}
          >
            What&apos;s on your mind, {user?.name?.split(' ')[0] || 'there'}?
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<PlusCircle size={16} />}
          >
            Create
          </Button>
        </div>

        {/* Feed Filter Tabs */}
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'forYou'}
            className={`${styles.tab} ${activeTab === 'forYou' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('forYou')}
          >
            <Sparkles size={16} /> For You
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'following'}
            className={`${styles.tab} ${activeTab === 'following' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className={styles.loaderArea}>
            <div className={styles.spinner} />
            <p>Loading your feed...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No posts found</p>
            <p className={styles.emptyDesc}>
              {searchTerm
                ? `No posts matched "${searchTerm}". Try another search term.`
                : 'Be the first to share an update with the community!'}
            </p>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              Create First Post
            </Button>
          </div>
        ) : (
          <div className={styles.postsList}>
            {filteredPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar Suggestions */}
      <aside className={styles.sideColumn}>
        <Card title="Welcome, Explorer" subtitle="Social Media Dashboard MVP">
          <p className={styles.sideText}>
            Built with modular React components, custom hooks, responsive CSS modules, and local state management.
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>✅ Reusable Buttons & Modals</div>
            <div className={styles.featureItem}>✅ Interactive Likes & Comments</div>
            <div className={styles.featureItem}>✅ Multi-view React Routing</div>
            <div className={styles.featureItem}>✅ Light / Dark Theme Toggle</div>
          </div>
        </Card>
      </aside>

      {/* Create Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Post"
      >
        <form onSubmit={handleCreatePost} className={styles.modalForm}>
          <textarea
            placeholder="Share what is happening..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.modalTextarea}
            rows={4}
            required
            autoFocus
          />

          <div className={styles.inputWithIcon}>
            <ImageIcon size={18} className={styles.inputIcon} />
            <input
              type="url"
              placeholder="Paste an image URL (optional)..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={styles.modalInput}
            />
          </div>

          <div className={styles.modalActions}>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
              disabled={!content.trim()}
            >
              Publish Post
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
