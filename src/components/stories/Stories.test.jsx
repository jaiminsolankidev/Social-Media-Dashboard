import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StoriesList from './StoriesList/StoriesList';
import { renderWithProviders } from '../../test/testUtils';

describe('Stories Component', () => {
  it('renders user story and friends stories in list', async () => {
    renderWithProviders(<StoriesList />);
    expect(await screen.findByText(/your story/i)).toBeInTheDocument();
  });

  it('opens story viewer when a friend story is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<StoriesList />);

    const storyButton = await screen.findByRole('button', {
      name: /view story from mayachen/i,
    });
    await user.click(storyButton);

    expect(screen.getByRole('dialog', { name: /story viewer/i })).toBeInTheDocument();
  });
});
