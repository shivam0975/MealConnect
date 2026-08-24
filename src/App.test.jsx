import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { publicRoutes } from "./routes";
import { renderApp } from "./test/utils";

// Identity only exists when the site is served by Netlify. Under Vitest it is
// mocked, and by default reports nobody signed in.
vi.mock("@netlify/identity", () => ({
  getUser: vi.fn(async () => null),
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(async () => undefined),
  onAuthChange: vi.fn(() => () => {}),
  hydrateSession: vi.fn(async () => undefined),
  handleAuthCallback: vi.fn(async () => null),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("public routing", () => {
  test("renders the homepage hero on the default route", async () => {
    renderApp("/");
    expect(
      await screen.findByRole("heading", { name: /turn surplus food/i })
    ).toBeInTheDocument();
  });

  test("renders the not-found page for an unknown route", async () => {
    renderApp("/no-such-page");
    expect(
      await screen.findByRole("heading", { name: /404 - page not found/i })
    ).toBeInTheDocument();
  });

  // Guards against a route being added with a broken import or a component
  // that throws on first render.
  test.each(publicRoutes.map((route) => route.path))(
    "%s renders a top-level heading",
    async (path) => {
      renderApp(path);
      expect(
        (await screen.findAllByRole("heading", { level: 1 })).length
      ).toBeGreaterThan(0);
    }
  );
});

describe("navigation for signed-out visitors", () => {
  test("shows a sign-in link and no dashboard links", async () => {
    renderApp("/");
    const nav = await screen.findByRole("navigation", { name: "Main" });

    expect(within(nav).getByRole("link", { name: "Sign in" })).toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: "Dashboard" })).toBeNull();
    expect(within(nav).queryByRole("link", { name: "Moderate" })).toBeNull();
  });
});

describe("footer navigation", () => {
  test.each([
    ["About Us", /who we are/i],
    ["Donate", /what your donation funds/i],
    ["FAQ", /frequently asked questions/i],
    ["Privacy Policy", /privacy policy/i],
    ["Terms of Service", /terms of service/i],
    ["Partner with Us", /partner with us/i],
    ["Events", /upcoming events/i],
    ["Careers", /open roles/i],
    ["Support Us", /support us/i],
  ])("footer link %s resolves to a real page", async (linkName, expected) => {
    const user = userEvent.setup();
    renderApp("/");

    const footer = await screen.findByRole("contentinfo");
    await user.click(within(footer).getByRole("link", { name: linkName }));

    expect(screen.getAllByText(expected).length).toBeGreaterThan(0);
  });
});
