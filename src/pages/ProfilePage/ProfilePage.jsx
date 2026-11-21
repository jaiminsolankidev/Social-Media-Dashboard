import { useState, useEffect } from 'react';
import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import { getUserProfile, updateUserProfile, getPosts } from '../../utils/api';
import styles from './ProfilePage.module.css';

/**
 * ProfilePage - Displays user profile details, statistics, and posts.
 */
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [userData, postsData] = await Promise.all([
          getUserProfile(),
          getPosts(),
        ]);
        if (isMounted) {
          setUser(userData);
          setName(userData.name || '');
          setBio(userData.bio || '');
          setWebsite(userData.website || '');
          setLocation(userData.location || '');
          // Filter posts authored by this user
          setPosts(postsData.filter((p) => p.author?.id === userData.id || p.author?.name === userData.name));
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUserProfile({
        name,
        bio,
        website,
        location,
      });
      setUser(updated);
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderArea}>
        <div className={styles.spinner} />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Core Profile Card */}
      <Profile
        user={user}
        isCurrentUser={true}
        onEditProfile={() => setIsEditOpen(true)}
      />

      {/* User's Timeline Section */}
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Shared Posts ({posts.length})</h3>
      </div>

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven&apos;t published any posts yet.</p>
        </div>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleSaveProfile} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="edit-name" className={styles.label}>Full Name</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-bio" className={styles.label}>Bio</label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-website" className={styles.label}>Website</label>
            <input
              id="edit-website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-location" className={styles.label}>Location</label>
            <input
              id="edit-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.modalActions}>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
