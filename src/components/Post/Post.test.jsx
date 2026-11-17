import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Post from './Post';

describe('Post Component', () => {
  const mockPost = {
    id: 'post-101',
    author: {
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    time: '2 hours ago',
    content: 'Exploring the mountains today! #nature #hiking',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
    likes: 42,
    isLiked: false,
    comments: [
      { id: 1, author: 'Alex', text: 'Breathtaking view!' },
    ],
  };

  it('renders author info, time, content and image', () => {
    render(<Post post={mockPost} />);

    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    expect(screen.getByText(/Exploring the mountains today!/)).toBeInTheDocument();
    expect(screen.getByAltText('Post content')).toBeInTheDocument();
  });

  it('toggles likes count when like button is clicked', () => {
    const handleLike = vi.fn();
    render(<Post post={mockPost} onLike={handleLike} />);

    const likeButton = screen.getByRole('button', { name: /like post/i });
    expect(screen.getByText('42 Likes')).toBeInTheDocument();

    // Click to like
    fireEvent.click(likeButton);
    expect(screen.getByText('43 Likes')).toBeInTheDocument();
    expect(handleLike).toHaveBeenCalledWith('post-101', true, 43);

    // Click again to unlike
    fireEvent.click(likeButton);
    expect(screen.getByText('42 Likes')).toBeInTheDocument();
    expect(handleLike).toHaveBeenCalledWith('post-101', false, 42);
  });

  it('toggles comments and allows submitting a new comment', () => {
    render(<Post post={mockPost} />);

    const commentButton = screen.getByRole('button', { name: /toggle comments/i });
    fireEvent.click(commentButton);

    // Initial comment is visible
    expect(screen.getByText('Breathtaking view!')).toBeInTheDocument();

    // Type and submit new comment
    const input = screen.getByPlaceholderText('Write a comment...');
    fireEvent.change(input, { target: { value: 'Incredible shot!' } });

    const submitBtn = screen.getByRole('button', { name: 'Post' });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Incredible shot!')).toBeInTheDocument();
  });
});
