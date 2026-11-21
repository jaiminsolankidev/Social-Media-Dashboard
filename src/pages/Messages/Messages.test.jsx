import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Messages from './Messages';
import { renderWithProviders } from '../../test/testUtils';

describe('Messages Page', () => {
  it('displays conversation list and search bar', async () => {
    renderWithProviders(<Messages />);
    expect(
      await screen.findByPlaceholderText(/search conversations/i)
    ).toBeInTheDocument();
  });

  it('allows user to type in message input when conversation is loaded', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Messages />);

    const messageInput = await screen.findByPlaceholderText(/write a message/i);
    expect(messageInput).toBeInTheDocument();

    await user.type(messageInput, 'Hello there!');
    expect(messageInput).toHaveValue('Hello there!');
  });
});
