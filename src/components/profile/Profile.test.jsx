import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from './Profile';

describe('Profile Component', () => {
  const mockUser = {
    id: 'user-1',
    name: 'Marcus Vance',
    username: 'marcus_vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Software engineer & traveler',
    location: 'Seattle, WA',
    website: 'https://github.com/marcus',
    followers: 850,
    followingCount: 220,
    postsCount: 15,
    isFollowing: false,
  };

  it('renders user details, bio, and statistics', () => {
    render(<Profile user={mockUser} />);

    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();
    expect(screen.getByText('@marcus_vance')).toBeInTheDocument();
    expect(screen.getByText('Software engineer & traveler')).toBeInTheDocument();
    expect(screen.getByText(/Seattle, WA/)).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
    expect(screen.getByText('220')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('toggles follow state and updates follower count', () => {
    const handleFollowChange = vi.fn();
    render(<Profile user={mockUser} onFollowChange={handleFollowChange} />);

    const followBtn = screen.getByRole('button', { name: 'Follow' });
    fireEvent.click(followBtn);

    expect(screen.getByRole('button', { name: 'Following' })).toBeInTheDocument();
    expect(screen.getByText('851')).toBeInTheDocument();
    expect(handleFollowChange).toHaveBeenCalledWith('user-1', true, 851);
  });

  it('renders edit profile button for current user', () => {
    const handleEdit = vi.fn();
    render(<Profile user={mockUser} isCurrentUser onEditProfile={handleEdit} />);

    const editBtn = screen.getByRole('button', { name: 'Edit Profile' });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
