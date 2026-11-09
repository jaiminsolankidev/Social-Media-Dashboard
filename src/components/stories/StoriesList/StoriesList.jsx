import { useState, useEffect, useRef } from 'react';
import StoryItem from '../StoryItem/StoryItem';
import StoryViewer from '../StoryViewer/StoryViewer';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { storyService } from '../../../services/storyService';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../common/Toast/Toast';
import styles from './StoriesList.module.css';

/**
 * Stories carousel component with story viewer and new story creator
 */
export default function StoriesList() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStoryUrl, setNewStoryUrl] = useState('');
  const [submittingStory, setSubmittingStory] = useState(false);

  const fileInputRef = useRef(null);

  const loadData = async () => {
    try {
      const [storyData, userData] = await Promise.all([
        storyService.getStories(),
        userService.getUsers(),
      ]);
      setStories(storyData);
      setUsers(userData);
    } catch (err) {
      console.warn('Failed to load stories:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStoryViewed = async (storyId) => {
    if (!currentUser?.id) return;
    try {
      await storyService.markStoryAsViewed(storyId, currentUser.id);
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId && !s.viewers?.includes(currentUser.id)
            ? { ...s, viewers: [...(s.viewers || []), currentUser.id] }
            : s
        )
      );
    } catch (err) {
      console.warn('Error recording story view:', err);
    }
  };

  const handleAddStory = async (imageUrl) => {
    if (!imageUrl || !currentUser?.id) return;
    setSubmittingStory(true);
    try {
      const created = await storyService.createStory({
        userId: currentUser.id,
        image: imageUrl,
      });
      setStories((prev) => [created, ...prev]);
      setIsAddModalOpen(false);
      setNewStoryUrl('');
      showToast('Story added successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to add story', 'error');
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleAddStory(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const ownStory = stories.find((s) => s.userId === currentUser?.id);
  const otherStories = stories.filter((s) => s.userId !== currentUser?.id);

  return (
    <>
      <div className={styles.container} aria-label="Stories">
        {/* Current user's story or Add Story prompt */}
        <StoryItem
          story={ownStory}
          author={currentUser}
          isOwn
          isSeen={ownStory?.viewers?.includes(currentUser?.id)}
          onClick={() => {
            const idx = stories.findIndex((s) => s.id === ownStory?.id);
            if (idx !== -1) setActiveStoryIndex(idx);
          }}
          onAddStory={() => setIsAddModalOpen(true)}
        />

        {/* Other users' stories */}
        {otherStories.map((story) => {
          const author = users.find((u) => u.id === story.userId);
          const isSeen = story.viewers?.includes(currentUser?.id);
          const storyIndex = stories.findIndex((s) => s.id === story.id);

          return (
            <StoryItem
              key={story.id}
              story={story}
              author={author}
              isSeen={isSeen}
              onClick={() => setActiveStoryIndex(storyIndex)}
            />
          );
        })}
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          users={users}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onStoryViewed={handleStoryViewed}
        />
      )}

      {/* Add Story Dialog */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add to Your Story"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Share a photo to your story that will be visible to friends for 24 hours.
          </p>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo from Device
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            — OR USE IMAGE URL —
          </div>

          <Input
            placeholder="https://images.unsplash.com/..."
            value={newStoryUrl}
            onChange={(e) => setNewStoryUrl(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={submittingStory}
              disabled={!newStoryUrl.trim()}
              onClick={() => handleAddStory(newStoryUrl.trim())}
            >
              Post Story
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
