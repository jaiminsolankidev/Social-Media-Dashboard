import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Notification from './Notification';

describe('Notification Component', () => {
  const mockNotification = {
    id: 'notif-1',
    actor: {
      name: 'Maya Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    type: 'like',
    time: '15m ago',
    isRead: false,
    postThumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150',
  };

  it('renders actor name, notification message, and timestamp', () => {
    render(<Notification notification={mockNotification} />);

    expect(screen.getByText('Maya Chen')).toBeInTheDocument();
    expect(screen.getByText(/liked your post/i)).toBeInTheDocument();
    expect(screen.getByText('15m ago')).toBeInTheDocument();
    expect(screen.getByAltText('Post preview')).toBeInTheDocument();
  });

  it('marks notification as read on click', () => {
    const handleMark = vi.fn();
    const handleClick = vi.fn();

    render(
      <Notification
        notification={mockNotification}
        onMarkAsRead={handleMark}
        onClick={handleClick}
      />
    );

    const item = screen.getByRole('button');
    fireEvent.click(item);

    expect(handleMark).toHaveBeenCalledWith('notif-1');
    expect(handleClick).toHaveBeenCalled();
  });
});
