// Registers jest-dom's custom matchers on Vitest's `expect`, so assertions like
// expect(element).toBeInTheDocument() are available in every test file.
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom has no layout engine and does not implement scrollTo. ScrollToTop calls
// it on every navigation, which would otherwise log a "Not implemented" error
// for each route change in the tests.
window.scrollTo = vi.fn();

/**
 * jsdom also has no matchMedia. useMediaQuery (and therefore Navbar) needs it.
 * The stub always reports "no match", so tests exercise the desktop layout —
 * the nav links are rendered inline rather than behind the drawer toggle.
 */
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
