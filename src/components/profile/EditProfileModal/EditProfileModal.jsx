import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Avatar from '../../common/Avatar/Avatar';
import { isValidUsername } from '../../../utils/validators';
import { useToast } from '../../common/Toast/Toast';
import styles from './EditProfileModal.module.css';

/**
 * Edit profile modal with live validation and API submission
 */
export default function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!isValidUsername(username)) {
      setError('Username must be 3-20 characters (letters, numbers, underscores).');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const updates = {
        name: name.trim(),
        username: username.trim().toLowerCase(),
        bio: bio.trim(),
        website: website.trim(),
        location: location.trim(),
        avatar: avatar.trim(),
      };

      if (onSave) {
        await onSave(updates);
      }

      showToast('Profile updated successfully!', 'success');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}

        <div className={styles.avatarSection}>
          <Avatar src={avatar} alt={name} name={name} size="lg" />
          <div className={styles.avatarMeta}>
            <span className={styles.username}>{username}</span>
            <span className={styles.nameHint}>{name}</span>
          </div>
        </div>

        <Input
          label="Profile Picture URL"
          placeholder="https://images.unsplash.com/..."
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500 }}>Bio</label>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell your story..."
          />
        </div>

        <Input
          label="Website"
          placeholder="https://yourwebsite.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <Input
          label="Location"
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={saving}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
