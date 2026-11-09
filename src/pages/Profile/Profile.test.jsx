import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from './Profile';
import { renderWithProviders } from '../../test/testUtils';

describe('Profile Page', () => {
  it('displays profile information for the current user', async () => {
    renderWithProviders(<Profile />);
    expect(await screen.findByText('Alex Morgan')).toBeInTheDocument();
    expect(screen.getAllByText(/alexmorgan/i)[0]).toBeInTheDocument();
  });

  it('opens edit profile modal when Edit Profile is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Profile />);

    const editBtn = await screen.findByRole('button', { name: /edit profile/i });
    await user.click(editBtn);

    expect(screen.getByRole('dialog', { name: /edit profile/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Alex Morgan');
  });
});
