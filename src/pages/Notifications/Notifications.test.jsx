import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notifications from './Notifications';
import { renderWithProviders } from '../../test/testUtils';

describe('Notifications Page', () => {
  it('displays notification heading and tabs', async () => {
    renderWithProviders(<Notifications />);
    expect(await screen.findByRole('heading', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /unread/i })).toBeInTheDocument();
  });

  it('allows switching to unread filter tab', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Notifications />);

    const unreadTab = screen.getByRole('tab', { name: /unread/i });
    await user.click(unreadTab);

    expect(unreadTab).toHaveAttribute('aria-selected', 'true');
  });
});
