import { useState, useRef } from 'react';
import { UploadCloud, X, MapPin, Hash, Image as ImageIcon } from 'lucide-react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { validateImageFile } from '../../../utils/validators';
import { extractHashtags } from '../../../utils/helpers';
import { useToast } from '../../common/Toast/Toast';
import styles from './PostComposer.module.css';

/**
 * Post creation form with image preview, validation, and API submission
 */
export default function PostComposer({ onPostCreated, onClose }) {
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [caption, setCaption] = useState('');
  const [hashtagsInput, setHashtagsInput] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (!imageUrl.trim()) {
      setError('Please provide a valid image URL.');
      return;
    }
    setError('');
    setImagePreview(imageUrl.trim());
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreview) {
      setError('Please provide an image for your post.');
      return;
    }
    if (!caption.trim()) {
      setError('Please write a caption for your post.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Combine explicitly entered hashtags with any hashtags typed inside the caption
      const captionTags = extractHashtags(caption);
      const manualTags = hashtagsInput
        .split(',')
        .map((tag) => tag.trim().replace(/^#/, '').toLowerCase())
        .filter(Boolean);

      const combinedHashtags = Array.from(new Set([...captionTags, ...manualTags]));

      const newPost = {
        image: imagePreview,
        caption: caption.trim(),
        hashtags: combinedHashtags,
        location: location.trim(),
      };

      if (onPostCreated) {
        await onPostCreated(newPost);
      }

      showToast('Post created successfully!', 'success');
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorBanner} role="alert">
          {error}
        </div>
      )}

      {/* Image Preview / Upload Area */}
      {imagePreview ? (
        <div className={styles.previewContainer}>
          <img
            src={imagePreview}
            alt="Preview of upload"
            className={styles.previewImage}
          />
          <button
            type="button"
            className={styles.removeImageButton}
            onClick={handleRemoveImage}
            aria-label="Remove selected image"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div>
          {!isUrlMode ? (
            <div
              className={styles.dropzone}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Click to upload an image"
            >
              <UploadCloud size={44} className={styles.uploadIcon} />
              <p className={styles.uploadText}>
                Choose photo from your computer
              </p>
              <p className={styles.uploadSubtext}>
                Supports JPG, PNG, WEBP (Max 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                prefixIcon={<ImageIcon size={18} />}
              />
              <Button type="button" onClick={handleUrlApply} variant="secondary">
                Apply
              </Button>
            </div>
          )}

          <div className={styles.urlToggle}>
            <button
              type="button"
              className={styles.toggleText}
              onClick={() => setIsUrlMode((prev) => !prev)}
            >
              {isUrlMode ? '← Upload from local device' : 'Or paste an Image URL →'}
            </button>
          </div>
        </div>
      )}

      {/* Caption Field */}
      <div>
        <textarea
          className={styles.textarea}
          placeholder="Write an engaging caption... (use #hashtags)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          aria-label="Post caption"
          rows={3}
        />
      </div>

      {/* Location & Hashtags */}
      <Input
        placeholder="Add location (e.g. Kyoto, Japan)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        prefixIcon={<MapPin size={18} />}
        aria-label="Location"
      />

      <Input
        placeholder="Additional tags (comma separated: travel, vibes)"
        value={hashtagsInput}
        onChange={(e) => setHashtagsInput(e.target.value)}
        prefixIcon={<Hash size={18} />}
        aria-label="Hashtags"
      />

      {/* Form Action Buttons */}
      <div className={styles.actions}>
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" loading={submitting}>
          Publish Post
        </Button>
      </div>
    </form>
  );
}
