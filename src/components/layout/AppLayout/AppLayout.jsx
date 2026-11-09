import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import Modal from '../../common/Modal/Modal';
import PostComposer from '../../posts/PostComposer/PostComposer';
import { postService } from '../../../services/postService';
import { useAuth } from '../../../hooks/useAuth';
import styles from './AppLayout.module.css';

/**
 * Master authenticated Layout containing persistent Navigation and creation modal
 */
export default function AppLayout() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePostCreated = async (postData) => {
    if (!currentUser?.id) return;
    await postService.createPost({
      ...postData,
      userId: currentUser.id,
    });
    setIsCreateModalOpen(false);
    navigate('/');
    // Trigger window event so any active feed refreshes immediately
    window.dispatchEvent(new CustomEvent('vybe_post_created'));
  };

  return (
    <div className={styles.appContainer}>
      {/* Persistent Left Sidebar */}
      <Sidebar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Mobile Top Header */}
      <Header />

      {/* Main Outlet for Current Route */}
      <main className={styles.mainContent}>
        <Outlet context={{ onOpenCreateModal: () => setIsCreateModalOpen(true) }} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Post"
      >
        <PostComposer
          onPostCreated={handlePostCreated}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
