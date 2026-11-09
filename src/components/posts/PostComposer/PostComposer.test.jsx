import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostComposer from './PostComposer';
import { renderWithProviders } from '../../../test/testUtils';

describe('PostComposer Component', () => {
  it('renders form fields correctly', () => {
    renderWithProviders(<PostComposer />);
    expect(
      screen.getByPlaceholderText(/write an engaging caption/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/add location/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /publish post/i })
    ).toBeInTheDocument();
  });

  it('validates missing image on submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostComposer />);

    const publishButton = screen.getByRole('button', { name: /publish post/i });
    await user.click(publishButton);

    expect(
      screen.getByText(/please provide an image for your post/i)
    ).toBeInTheDocument();
  });

  it('validates missing caption when image is provided', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostComposer />);

    // Switch to URL mode
    const switchButton = screen.getByRole('button', {
      name: /or paste an image url/i,
    });
    await user.click(switchButton);

    const urlInput = screen.getByPlaceholderText(/https:\/\/images\.unsplash/i);
    await user.type(urlInput, 'https://example.com/test.jpg');

    const applyButton = screen.getByRole('button', { name: /apply/i });
    await user.click(applyButton);

    const publishButton = screen.getByRole('button', { name: /publish post/i });
    await user.click(publishButton);

    expect(
      screen.getByText(/please write a caption for your post/i)
    ).toBeInTheDocument();
  });

  it('calls onPostCreated callback with valid data', async () => {
    const handlePostCreated = vi.fn().mockResolvedValue({});
    const user = userEvent.setup();

    renderWithProviders(<PostComposer onPostCreated={handlePostCreated} />);

    // Switch to URL mode
    await user.click(screen.getByRole('button', { name: /or paste an image url/i }));
    await user.type(
      screen.getByPlaceholderText(/https:\/\/images\.unsplash/i),
      'https://example.com/photo.jpg'
    );
    await user.click(screen.getByRole('button', { name: /apply/i }));

    // Type caption and location
    await user.type(
      screen.getByPlaceholderText(/write an engaging caption/i),
      'Golden hour memories #sunset'
    );
    await user.type(
      screen.getByPlaceholderText(/add location/i),
      'Malibu, California'
    );

    // Publish
    await user.click(screen.getByRole('button', { name: /publish post/i }));

    expect(handlePostCreated).toHaveBeenCalledWith(
      expect.objectContaining({
        image: 'https://example.com/photo.jpg',
        caption: 'Golden hour memories #sunset',
        location: 'Malibu, California',
        hashtags: expect.arrayContaining(['sunset']),
      })
    );
  });
});
