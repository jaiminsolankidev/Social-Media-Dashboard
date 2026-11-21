import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test/testUtils';

describe('Application Routing', () => {
  it('renders Home page on root route', async () => {
    renderWithProviders(<App />, { route: '/' });
    expect(
      await screen.findByRole('tab', { name: /for you/i }, { timeout: 3000 })
    ).toBeInTheDocument();
  });

  it('renders Notifications page on /notifications route', async () => {
    renderWithProviders(<App />, { route: '/notifications' });
    expect(
      await screen.findByRole('heading', { name: /notifications/i })
    ).toBeInTheDocument();
  });

  it('renders Messages page on /messages route', async () => {
    renderWithProviders(<App />, { route: '/messages' });
    expect(
      await screen.findByRole('heading', { name: /direct messages/i })
    ).toBeInTheDocument();
  });
});
