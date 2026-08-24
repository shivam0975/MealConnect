import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ROLE_HOME } from "../../lib/roles";
import Spinner from "../../common/components/Spinner";
import "./Login.css";

const ROLE_OPTIONS = [
  {
    value: "restaurant",
    title: "Restaurant",
    blurb: "List surplus food at the end of service.",
  },
  {
    value: "ngo",
    title: "NGO / Shelter",
    blurb: "Claim donations and feed your community.",
  },
];

const Login = () => {
  const { isAuthenticated, role, status, login, signup } = useAuth();
  const location = useLocation();

  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "restaurant",
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  /** Switching tabs clears any message left over from the other mode. */
  const switchMode = (next) => {
    setMode(next);
    setError("");
    setNotice("");
  };

  if (status === "loading") {
    return <Spinner label="Checking your session…" />;
  }

  if (isAuthenticated) {
    const destination = location.state?.from ?? ROLE_HOME[role] ?? "/";
    return <Navigate to={destination} replace />;
  }

  const update = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    try {
      if (mode === "signin") {
        await login(form.email, form.password);
        // The redirect above fires once isAuthenticated flips.
      } else {
        await signup(form.email, form.password, {
          fullName: form.fullName,
          role: form.role,
        });
        setNotice(
          "Account created. If confirmation emails are enabled, check your inbox before signing in."
        );
        setMode("signin");
      }
    } catch (submitError) {
      setError(
        submitError?.message ||
          "That didn't work. Check your details and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <div className="auth-page">
      <div className="container container--narrow">
        <div className="auth-card card">
          <div className="auth-tabs" role="tablist" aria-label="Account">
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              className={`auth-tab ${!isSignup ? "is-active" : ""}`}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              className={`auth-tab ${isSignup ? "is-active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Create account
            </button>
          </div>

          <h1 className="auth-title">
            {isSignup ? "Join MealConnect" : "Welcome back"}
          </h1>
          <p className="auth-intro">
            {isSignup
              ? "Register your kitchen or your organisation to start moving food."
              : "Sign in to reach your dashboard."}
          </p>

          {error && (
            <p className="form-status form-status--error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="form-status form-status--success" role="status">
              {notice}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label className="field" htmlFor="fullName">
                <span className="field__label">Full name</span>
                <input
                  className="field__control"
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={update}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="field" htmlFor="email">
              <span className="field__label">Email</span>
              <input
                className="field__control"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                autoComplete="email"
                required
              />
            </label>

            <label className="field" htmlFor="password">
              <span className="field__label">Password</span>
              <input
                className="field__control"
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={update}
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                required
              />
              {isSignup && (
                <span className="field__hint">At least 8 characters.</span>
              )}
            </label>

            {isSignup && (
              <fieldset className="auth-roles">
                <legend className="field__label">I am signing up as</legend>
                {ROLE_OPTIONS.map(({ value, title, blurb }) => (
                  <label
                    key={value}
                    className={`auth-role ${
                      form.role === value ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={form.role === value}
                      onChange={update}
                    />
                    <span>
                      <strong>{title}</strong>
                      <span className="auth-role__blurb">{blurb}</span>
                    </span>
                  </label>
                ))}
                <p className="field__hint">
                  Administrator accounts cannot be self-registered — an existing
                  admin grants that role from the Netlify dashboard.
                </p>
              </fieldset>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={busy}
            >
              {busy
                ? "Working…"
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="auth-footnote">
            By continuing you agree to our <Link to="/terms">Terms</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
