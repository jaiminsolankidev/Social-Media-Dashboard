import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test/testUtils';

describe('Application Routing', () => {
  it('renders Home page for authenticated user on root route', async () => {
    renderWithProviders(<App />, { route: '/' });
    expect(await screen.findByRole('tab', { name: /for you/i })).toBeInTheDocument();
  });

  it('renders Explore page on /explore route', async () => {
    renderWithProviders(<App />, { route: '/explore' });
    expect(
      await screen.findByPlaceholderText(/search accounts, hashtags/i)
    ).toBeInTheDocument();
  });

  it('renders Not Found page on an invalid route', async () => {
    renderWithProviders(<App />, { route: '/invalid-path-that-does-not-exist' });
    expect(await screen.findByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/sorry, this page isn't available/i)
    ).toBeInTheDocument();
  });
});
