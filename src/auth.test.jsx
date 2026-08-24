import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  getUser,
  login as identityLogin,
  signup as identitySignup,
} from "@netlify/identity";
import {
  makeDonation,
  makeUser,
  mockDonationsFetch,
  renderApp,
} from "./test/utils";

vi.mock("@netlify/identity", () => ({
  getUser: vi.fn(async () => null),
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(async () => undefined),
  onAuthChange: vi.fn(() => () => {}),
  hydrateSession: vi.fn(async () => undefined),
  handleAuthCallback: vi.fn(async () => null),
}));

/** Sign in as the given role for the duration of one test. */
const signedInAs = (role) => {
  const user = makeUser({ role });
  getUser.mockResolvedValue(user);
  return user;
};

beforeEach(() => {
  vi.clearAllMocks();
  getUser.mockResolvedValue(null);
  mockDonationsFetch([]);
});

describe("route protection", () => {
  test.each(["/restaurants", "/ngos", "/admin", "/add-donation", "/manage-donations"])(
    "%s sends a signed-out visitor to the login page",
    async (path) => {
      renderApp(path);
      expect(
        await screen.findByRole("heading", { name: /welcome back/i })
      ).toBeInTheDocument();
    }
  );

  test("a restaurant reaches its own dashboard", async () => {
    signedInAs("restaurant");
    renderApp("/restaurants");
    expect(
      await screen.findByRole("heading", { name: /restaurant dashboard/i })
    ).toBeInTheDocument();
  });

  test("a restaurant is refused the admin area", async () => {
    signedInAs("restaurant");
    renderApp("/admin");
    expect(
      await screen.findByRole("heading", { name: /isn't for your account/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /admin panel/i })).toBeNull();
  });

  test("an NGO is refused the moderation queue", async () => {
    signedInAs("ngo");
    renderApp("/manage-donations");
    expect(
      await screen.findByRole("heading", { name: /isn't for your account/i })
    ).toBeInTheDocument();
  });

  test("an admin reaches the moderation queue", async () => {
    signedInAs("admin");
    renderApp("/manage-donations");
    expect(
      await screen.findByRole("heading", { name: /manage donations/i })
    ).toBeInTheDocument();
  });

  test("an account with no role is told it needs one", async () => {
    getUser.mockResolvedValue(makeUser({ role: undefined }));
    renderApp("/restaurants");
    expect(
      await screen.findByText(/no role assigned/i)
    ).toBeInTheDocument();
  });
});

describe("role-aware navigation", () => {
  test("an admin sees the moderation link, a restaurant does not", async () => {
    signedInAs("admin");
    const { unmount } = renderApp("/");
    let nav = await screen.findByRole("navigation", { name: "Main" });
    expect(within(nav).getByRole("link", { name: "Moderate" })).toBeInTheDocument();
    unmount();

    signedInAs("restaurant");
    renderApp("/");
    nav = await screen.findByRole("navigation", { name: "Main" });
    expect(within(nav).queryByRole("link", { name: "Moderate" })).toBeNull();
    expect(
      within(nav).getByRole("link", { name: "Add Donation" })
    ).toBeInTheDocument();
  });
});

describe("login page", () => {
  test("signing in calls Netlify Identity with the credentials", async () => {
    const user = userEvent.setup();
    identityLogin.mockResolvedValue(makeUser({ role: "restaurant" }));
    renderApp("/login");

    await user.type(
      await screen.findByLabelText(/email/i),
      "chef@example.com"
    );
    await user.type(screen.getByLabelText(/password/i), "hunter2hunter2");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(identityLogin).toHaveBeenCalledWith(
      "chef@example.com",
      "hunter2hunter2"
    );
  });

  test("a failed sign in surfaces the error", async () => {
    const user = userEvent.setup();
    identityLogin.mockRejectedValue(new Error("Invalid credentials"));
    renderApp("/login");

    await user.type(await screen.findByLabelText(/email/i), "chef@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /invalid credentials/i
    );
  });

  test("signing up passes the chosen role as user metadata", async () => {
    const user = userEvent.setup();
    identitySignup.mockResolvedValue(null);
    renderApp("/login");

    await user.click(
      await screen.findByRole("tab", { name: /create account/i })
    );
    await user.type(screen.getByLabelText(/full name/i), "Dana Chef");
    await user.type(screen.getByLabelText(/email/i), "dana@example.com");
    await user.type(screen.getByLabelText(/password/i), "hunter2hunter2");
    await user.click(screen.getByRole("radio", { name: /ngo \/ shelter/i }));
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(identitySignup).toHaveBeenCalledWith(
      "dana@example.com",
      "hunter2hunter2",
      { full_name: "Dana Chef", role: "ngo" }
    );
  });

  test("admin is not offered as a self-service role", async () => {
    const user = userEvent.setup();
    renderApp("/login");
    await user.click(
      await screen.findByRole("tab", { name: /create account/i })
    );

    expect(screen.queryByRole("radio", { name: /admin/i })).toBeNull();
    expect(screen.getByText(/cannot be self-registered/i)).toBeInTheDocument();
  });
});

describe("dashboard data", () => {
  test("an NGO can claim an available donation", async () => {
    const user = userEvent.setup();
    signedInAs("ngo");
    const fetchMock = mockDonationsFetch([makeDonation()]);

    renderApp("/ngos");
    await user.click(await screen.findByRole("button", { name: /^claim$/i }));

    const patch = fetchMock.mock.calls.find(
      ([, options]) => options?.method === "PATCH"
    );
    expect(patch).toBeDefined();
    expect(JSON.parse(patch[1].body)).toEqual({
      id: "donation-1",
      status: "Accepted",
    });
  });

  test("a restaurant sees its listings loaded from the API", async () => {
    signedInAs("restaurant");
    mockDonationsFetch([makeDonation({ foodType: "Lentil soup" })]);

    renderApp("/restaurants");
    // A pending listing shows in both "Awaiting a claim" and "Recent activity".
    expect(await screen.findAllByText("Lentil soup")).toHaveLength(2);
  });

  test("an API failure is surfaced rather than swallowed", async () => {
    signedInAs("admin");
    globalThis.fetch = vi.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: "Database unavailable" }),
    }));

    renderApp("/admin");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /database unavailable/i
    );
  });
});
