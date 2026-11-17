import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  it('renders children content correctly', () => {
    render(<Card>Card body content</Card>);
    expect(screen.getByText('Card body content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <Card title="Card Title" subtitle="Card Subtitle">
        Content
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
  });

  it('renders header action and footer', () => {
    render(
      <Card
        title="Title"
        headerAction={<button>Action</button>}
        footer={<span>Footer info</span>}
      >
        Body
      </Card>
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByText('Footer info')).toBeInTheDocument();
  });

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
