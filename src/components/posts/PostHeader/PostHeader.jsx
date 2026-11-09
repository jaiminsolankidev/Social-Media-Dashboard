import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Trash2, Flag, Link as LinkIcon } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import Dropdown, { DropdownItem, DropdownDivider } from '../../common/Dropdown/Dropdown';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import { formatRelativeTime } from '../../../utils/formatDate';
import { copyToClipboard } from '../../../utils/helpers';
import { useToast } from '../../common/Toast/Toast';
import styles from './PostHeader.module.css';

/**
 * Header section of PostCard with author info, location, and action dropdown
 */
export default function PostHeader({
  post,
  author,
  isOwn = false,
  onDeletePost,
}) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleCopyLink = async () => {
    const postUrl = `${window.location.origin}/#post-${post.id}`;
    const copied = await copyToClipboard(postUrl);
    if (copied) {
      showToast('Post link copied to clipboard!', 'success');
    }
  };

  const handleConfirmReport = () => {
    setIsReportModalOpen(false);
    showToast('Thank you for reporting. Our safety team will review this post.', 'info');
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    if (onDeletePost) {
      await onDeletePost(post.id);
      showToast('Post deleted successfully.', 'info');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.authorContainer}>
          <Link to={`/profile/${author?.username || ''}`}>
            <Avatar
              src={author?.avatar}
              alt={author?.name}
              name={author?.name}
              size="sm"
            />
          </Link>
          <div className={styles.authorMeta}>
            <div className={styles.nameRow}>
              <Link to={`/profile/${author?.username || ''}`} className={styles.username}>
                {author?.username || 'user'}
              </Link>
              <span className={styles.dot}>•</span>
              <span className={styles.time}>{formatRelativeTime(post.createdAt)}</span>
            </div>
            {post.location && <span className={styles.location}>{post.location}</span>}
          </div>
        </div>

        {/* Post Options Dropdown */}
        <Dropdown
          trigger={
            <button
              type="button"
              className={styles.moreButton}
              aria-label="Post options"
            >
              <MoreHorizontal size={20} />
            </button>
          }
        >
          <DropdownItem icon={<LinkIcon size={16} />} onClick={handleCopyLink}>
            Copy Link
          </DropdownItem>
          {isOwn && (
            <>
              <DropdownDivider />
              <DropdownItem
                icon={<Trash2 size={16} />}
                danger
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete Post
              </DropdownItem>
            </>
          )}
          {!isOwn && (
            <>
              <DropdownDivider />
              <DropdownItem
                icon={<Flag size={16} />}
                danger
                onClick={() => setIsReportModalOpen(true)}
              >
                Report Post
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Post"
      >
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
          Are you sure you want to permanently delete this post? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>

      {/* Report Demo Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Content"
      >
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Please select a reason for reporting this post:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {['Spam or misleading', 'Inappropriate or harmful content', 'Copyright violation', 'Harassment or hate speech'].map((reason) => (
            <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="report_reason" defaultChecked={reason.startsWith('Spam')} />
              <span>{reason}</span>
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReport}>
            Submit Report
          </Button>
        </div>
      </Modal>
    </>
  );
}
