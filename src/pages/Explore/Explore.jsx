import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Heart, MessageCircle, UserX } from 'lucide-react';
import Avatar from '../../components/common/Avatar/Avatar';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import PostCard from '../../components/posts/PostCard/PostCard';
import { useDebounce } from '../../hooks/useDebounce';
import { postService } from '../../services/postService';
import { userService } from '../../services/userService';
import styles from './Explore.module.css';

const CATEGORIES = [
  'All',
  '#photography',
  '#wanderlust',
  '#architecture',
  '#minimalism',
  '#coffee',
  '#nature',
  '#design',
];

/**
 * Explore page with debounced search, matching user list, and discovery grid
 */
export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const [selectedCategory, setSelectedCategory] = useState(
    initialQuery.startsWith('#') ? initialQuery : 'All'
  );
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [postData, userData] = await Promise.all([
          postService.getPosts(),
          userService.getUsers(),
        ]);
        setPosts(postData);
        setUsers(userData);
      } catch (err) {
        console.warn('Error fetching explore data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync url param if query changes
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const cleanQuery = debouncedQuery.trim().toLowerCase();

  // Filter users matching search query
  const matchedUsers = useMemo(() => {
    if (!cleanQuery) return [];
    const searchNoHash = cleanQuery.replace(/^#/, '');
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(searchNoHash) ||
        u.name.toLowerCase().includes(searchNoHash)
    );
  }, [users, cleanQuery]);

  // Filter posts matching category and search query
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Category filter
    if (selectedCategory !== 'All') {
      const tag = selectedCategory.replace(/^#/, '').toLowerCase();
      result = result.filter((p) => p.hashtags?.includes(tag));
    }

    // Search query filter
    if (cleanQuery) {
      const searchNoHash = cleanQuery.replace(/^#/, '');
      result = result.filter((p) => {
        const matchesCaption = p.caption?.toLowerCase().includes(cleanQuery);
        const matchesLocation = p.location?.toLowerCase().includes(cleanQuery);
        const matchesTag = p.hashtags?.some((t) =>
          t.toLowerCase().includes(searchNoHash)
        );
        return matchesCaption || matchesLocation || matchesTag;
      });
    }

    return result;
  }, [posts, selectedCategory, cleanQuery]);

  const handleClearSearch = () => {
    setQuery('');
    setSelectedCategory('All');
  };

  const selectedPostAuthor = useMemo(() => {
    return users.find((u) => u.id === selectedPost?.userId);
  }, [users, selectedPost]);

  return (
    <div className={styles.container}>
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <div className={styles.searchBarWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search accounts, hashtags, or captions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className={styles.categoryChips} role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.chip} ${
                selectedCategory === cat ? styles.activeChip : ''
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat !== 'All') {
                  setQuery(cat);
                } else {
                  setQuery('');
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader size="lg" text="Exploring content..." />
      ) : (
        <>
          {/* Matched Users Section (if searching) */}
          {cleanQuery && matchedUsers.length > 0 && (
            <section className={styles.usersSection} aria-label="Matching Accounts">
              <h3 className={styles.sectionTitle}>Accounts</h3>
              {matchedUsers.slice(0, 5).map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.username}`}
                  className={styles.userResultItem}
                >
                  <div className={styles.userResultMeta}>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      name={user.name}
                      size="sm"
                    />
                    <div className={styles.userResultText}>
                      <span className={styles.username}>{user.username}</span>
                      <span className={styles.name}>{user.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {/* Posts Grid or Empty State */}
          {filteredPosts.length === 0 ? (
            <EmptyState
              icon={<UserX size={36} />}
              title="No Results Found"
              description={`We couldn't find any posts or accounts matching "${query}". Try searching for popular topics like #photography, #coffee, or names.`}
              action={
                <button
                  type="button"
                  className={styles.chip}
                  onClick={handleClearSearch}
                >
                  Clear Search
                </button>
              }
            />
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={styles.gridItem}
                  onClick={() => setSelectedPost(post)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View post: ${post.caption || 'Photo'}`}
                >
                  <img
                    src={post.image}
                    alt={post.caption || 'Explore post'}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.overlay} aria-hidden="true">
                    <span className={styles.statItem}>
                      <Heart size={20} fill="#FFFFFF" />
                      <span>{post.likes?.length || 0}</span>
                    </span>
                    <span className={styles.statItem}>
                      <MessageCircle size={20} fill="#FFFFFF" />
                      <span>{post.commentsCount || 0}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Post Modal */}
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
