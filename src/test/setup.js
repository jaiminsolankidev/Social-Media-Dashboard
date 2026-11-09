import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: () => Promise.resolve(),
  },
});

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = () => {};
