import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from './Explore';
import { renderWithProviders } from '../../test/testUtils';

describe('Explore & Search Page', () => {
  it('renders search input and category chips', async () => {
    renderWithProviders(<Explore />);
    expect(
      screen.getByPlaceholderText(/search accounts, hashtags/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#photography/i })).toBeInTheDocument();
  });

  it('filters results when searching', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Explore />);

    const searchInput = screen.getByPlaceholderText(/search accounts, hashtags/i);
    await user.type(searchInput, 'maya');

    // Wait for debounced search result
    expect(await screen.findByText('mayachen')).toBeInTheDocument();
  });

  it('displays empty state when no results match', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Explore />);

    const searchInput = screen.getByPlaceholderText(/search accounts, hashtags/i);
    await user.type(searchInput, 'xyznonexistentquery999');

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});
