import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/profile/ProfileHeader/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs/ProfileTabs';
import ProfilePostGrid from '../../components/profile/ProfilePostGrid/ProfilePostGrid';
import EditProfileModal from '../../components/profile/EditProfileModal/EditProfileModal';
import Modal from '../../components/common/Modal/Modal';
import PostCard from '../../components/posts/PostCard/PostCard';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { userService } from '../../services/userService';
import { postService } from '../../services/postService';
import { useAuth } from '../../hooks/useAuth';
import { Image, Bookmark, Tag } from 'lucide-react';
import styles from './Profile.module.css';

/**
 * User Profile page supporting current user and public profile views
 */
export default function Profile() {
  const { username } = useParams();
  const { currentUser, updateUserProfile, refreshUser } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'tagged'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const isOwnProfile = useMemo(() => {
    if (!username) return true;
    return (
      currentUser?.username?.toLowerCase() === username.toLowerCase() ||
      currentUser?.id === username
    );
  }, [username, currentUser]);

  const loadProfileData = useCallback(async () => {
    setLoading(true);
    try {
      let targetUser = currentUser;
      if (!isOwnProfile && username) {
        targetUser = await userService.getUserByUsername(username);
      }
      setProfileUser(targetUser);

      const posts = await postService.getPosts();
      setAllPosts(posts);
    } catch (err) {
      console.warn('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  }, [username, isOwnProfile, currentUser]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  const isFollowing = useMemo(() => {
    return Boolean(
      currentUser?.following?.includes(profileUser?.id)
    );
  }, [currentUser?.following, profileUser?.id]);

  const handleToggleFollow = async () => {
    if (!currentUser?.id || !profileUser?.id) return;
    try {
      if (isFollowing) {
        await userService.unfollowUser(currentUser.id, profileUser.id);
      } else {
        await userService.followUser(currentUser.id, profileUser.id);
      }
      await refreshUser();
      const updatedTarget = await userService.getUserById(profileUser.id);
      setProfileUser(updatedTarget);
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    }
  };

  const handleSaveProfile = async (updates) => {
    const updated = await updateUserProfile(updates);
    setProfileUser(updated);
  };

  // Filter posts based on active tab
  const userPosts = useMemo(() => {
    return allPosts.filter((p) => p.userId === profileUser?.id);
  }, [allPosts, profileUser?.id]);

  const savedPosts = useMemo(() => {
    const savedIds = currentUser?.savedPosts || [];
    return allPosts.filter((p) => savedIds.includes(p.id));
  }, [allPosts, currentUser?.savedPosts]);

  const displayedPosts = useMemo(() => {
    if (activeTab === 'saved' && isOwnProfile) return savedPosts;
    if (activeTab === 'tagged') return [];
    return userPosts;
  }, [activeTab, isOwnProfile, savedPosts, userPosts]);

  if (loading) {
    return <Loader size="lg" text="Loading profile..." />;
  }

  if (!profileUser) {
    return (
      <EmptyState
        title="User Not Found"
        description="The account you are looking for does not exist or may have been removed."
      />
    );
  }

  return (
    <div className={styles.container}>
      <ProfileHeader
        user={profileUser}
        postsCount={userPosts.length}
        isOwn={isOwnProfile}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      <ProfileTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        showSaved={isOwnProfile}
      />

      {displayedPosts.length === 0 ? (
        <EmptyState
          icon={
            activeTab === 'saved' ? (
              <Bookmark size={32} />
            ) : activeTab === 'tagged' ? (
              <Tag size={32} />
            ) : (
              <Image size={32} />
            )
          }
          title={
            activeTab === 'saved'
              ? 'Save Photos and Videos'
              : activeTab === 'tagged'
              ? 'No Tagged Photos'
              : 'No Posts Yet'
          }
          description={
            activeTab === 'saved'
              ? 'Save photos and videos that you want to see again. No one is notified, and only you can see what you have saved.'
              : activeTab === 'tagged'
              ? 'When people tag you in photos and videos, they will appear here.'
              : `${profileUser.name} has not published any posts yet.`
          }
        />
      ) : (
        <ProfilePostGrid
          posts={displayedPosts}
          onSelectPost={(post) => setSelectedPost(post)}
        />
      )}

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={currentUser}
          onSave={handleSaveProfile}
        />
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <Modal
          isOpen={Boolean(selectedPost)}
          onClose={() => setSelectedPost(null)}
          title="Post Details"
        >
          <PostCard
            post={selectedPost}
            author={profileUser}
            onToggleLike={() => {
              // Update local post state
              const userId = currentUser.id;
              const hasLiked = selectedPost.likes?.includes(userId);
              const newLikes = hasLiked
                ? selectedPost.likes.filter((id) => id !== userId)
                : [...(selectedPost.likes || []), userId];
              setSelectedPost({ ...selectedPost, likes: newLikes });
              setAllPosts((prev) =>
                prev.map((p) =>
                  p.id === selectedPost.id ? { ...p, likes: newLikes } : p
                )
              );
              if (hasLiked) {
                postService.unlikePost(selectedPost.id, userId);
              } else {
                postService.likePost(selectedPost.id, userId);
              }
            }}
          />
        </Modal>
      )}
    </div>
  );
}
