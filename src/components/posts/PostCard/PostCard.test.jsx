import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCard from './PostCard';
import { renderWithProviders } from '../../../test/testUtils';

const mockAuthor = {
  id: 'u1',
  name: 'Alex Morgan',
  username: 'alexmorgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
};

const mockPost = {
  id: 'p1',
  userId: 'u1',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  caption: 'Chasing the morning light through alpine valleys.',
  hashtags: ['mountains', 'alps'],
  location: 'Dolomites, Italy',
  likes: ['u2', 'u3'],
  createdAt: '2026-11-08T18:00:00Z',
};

describe('PostCard Component', () => {
  it('displays author information and location', () => {
    renderWithProviders(<PostCard post={mockPost} author={mockAuthor} />);
    expect(screen.getAllByText('alexmorgan')[0]).toBeInTheDocument();
    expect(screen.getByText('Dolomites, Italy')).toBeInTheDocument();
  });

  it('displays caption and hashtags', () => {
    renderWithProviders(<PostCard post={mockPost} author={mockAuthor} />);
    expect(screen.getByText(/Chasing the morning light/i)).toBeInTheDocument();
    expect(screen.getByText('#mountains')).toBeInTheDocument();
  });

  it('displays post image with proper alt text', () => {
    renderWithProviders(<PostCard post={mockPost} author={mockAuthor} />);
    const image = screen.getByRole('img', { name: mockPost.caption });
    expect(image).toBeInTheDocument();
  });

  it('triggers like toggle when like button is clicked', async () => {
    const handleToggleLike = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <PostCard
        post={mockPost}
        author={mockAuthor}
        onToggleLike={handleToggleLike}
      />
    );

    const likeButton = screen.getByRole('button', { name: /like post/i });
    await user.click(likeButton);

    expect(handleToggleLike).toHaveBeenCalledWith('p1');
  });

  it('toggles comment section when comment button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<PostCard post={mockPost} author={mockAuthor} />);

    const commentButton = screen.getByRole('button', { name: /view comments/i });
    await user.click(commentButton);

    expect(screen.getByPlaceholderText(/add a comment\.\.\./i)).toBeInTheDocument();
  });
});
