import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../src/components/common/Button/Button';
import Card from '../src/components/common/Card/Card';
import Modal from '../src/components/common/Modal/Modal';
import Post from '../src/components/Post/Post';
import Profile from '../src/components/Profile/Profile';
import Notification from '../src/components/Notification/Notification';

describe('Social Media Dashboard - Core Component Suite', () => {
  describe('Reusable Button Component', () => {
    it('renders with custom text and handles onClick', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);

      const btn = screen.getByRole('button', { name: 'Click Me' });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when loading or disabled prop is set', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Reusable Card Component', () => {
    it('renders card title, subtitle, and body content', () => {
      render(
        <Card title="Analytics" subtitle="Weekly overview">
          <p>Total impressions: 14.5k</p>
        </Card>
      );
      expect(screen.getByText('Analytics')).toBeInTheDocument();
      expect(screen.getByText('Weekly overview')).toBeInTheDocument();
      expect(screen.getByText('Total impressions: 14.5k')).toBeInTheDocument();
    });
  });

  describe('Reusable Modal Component', () => {
    it('renders modal content when isOpen is true and triggers onClose on escape', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Create Post">
          <div>Modal Body Content</div>
        </Modal>
      );

      expect(screen.getByText('Create Post')).toBeInTheDocument();
      expect(screen.getByText('Modal Body Content')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Hidden">
          <div>Hidden</div>
        </Modal>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
  });

  describe('Post Component (State Management & Data Flow)', () => {
    const postData = {
      id: 'p-1',
      author: {
        name: 'David Miller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      },
      time: '1 hour ago',
      content: 'Just launched my new open source project! Check it out.',
      likes: 10,
      comments: [{ id: 1, author: 'Alice', text: 'Congrats!' }],
    };

    it('renders post details accurately', () => {
      render(<Post post={postData} />);
      expect(screen.getByText('David Miller')).toBeInTheDocument();
      expect(screen.getByText('1 hour ago')).toBeInTheDocument();
      expect(screen.getByText(/Just launched my new open source project/)).toBeInTheDocument();
      expect(screen.getByText('10 Likes')).toBeInTheDocument();
    });

    it('increments and decrements likes using useState', () => {
      render(<Post post={postData} />);
      const likeBtn = screen.getByRole('button', { name: /like post/i });

      fireEvent.click(likeBtn);
      expect(screen.getByText('11 Likes')).toBeInTheDocument();

      fireEvent.click(likeBtn);
      expect(screen.getByText('10 Likes')).toBeInTheDocument();
    });

    it('adds a new comment interactively', () => {
      render(<Post post={postData} />);
      const commentToggle = screen.getByRole('button', { name: /toggle comments/i });
      fireEvent.click(commentToggle);

      const input = screen.getByPlaceholderText('Write a comment...');
      fireEvent.change(input, { target: { value: 'Great job!' } });

      const submitBtn = screen.getByRole('button', { name: 'Post' });
      fireEvent.click(submitBtn);

      expect(screen.getByText('Great job!')).toBeInTheDocument();
    });
  });

  describe('Profile Component', () => {
    const userData = {
      id: 'u-1',
      name: 'Samantha Ray',
      username: 'samanthar',
      bio: 'UI/UX Designer & React Developer',
      followers: 500,
      followingCount: 150,
      postsCount: 24,
    };

    it('renders profile stats and user information', () => {
      render(<Profile user={userData} />);
      expect(screen.getByText('Samantha Ray')).toBeInTheDocument();
      expect(screen.getByText('@samanthar')).toBeInTheDocument();
      expect(screen.getByText('UI/UX Designer & React Developer')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  describe('Notification Component', () => {
    const notifData = {
      id: 'n-1',
      actor: { name: 'Elena Rostova' },
      type: 'like',
      time: '10m ago',
      isRead: false,
    };

    it('renders actor and interaction with read toggle', () => {
      const handleRead = vi.fn();
      render(<Notification notification={notifData} onMarkAsRead={handleRead} />);

      expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
      expect(screen.getByText(/liked your post/i)).toBeInTheDocument();

      const item = screen.getByRole('button');
      fireEvent.click(item);
      expect(handleRead).toHaveBeenCalledWith('n-1');
    });
  });
});
