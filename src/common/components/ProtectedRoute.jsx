import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import PageHeader from "./PageHeader";
import Spinner from "./Spinner";
import { ROLE_HOME } from "../../lib/roles";

/**
 * Gate for authenticated routes.
 *
 * `allow` is a list of roles permitted through. Omit it to require only that
 * somebody is signed in.
 *
 * This is a usability guard, not a security boundary — it decides what the UI
 * offers. Every function in netlify/functions re-checks the caller's role
 * against the database before doing anything, because anything the browser
 * enforces can be bypassed.
 */
const ProtectedRoute = ({ allow }) => {
  const { isAuthenticated, role, status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <Spinner label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    // Remember where they were headed so login can send them back.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allow && !allow.includes(role)) {
    return (
      <PageHeader
        eyebrow="No access"
        title="This area isn't for your account"
        description={
          role
            ? `You are signed in as ${role}. This page is limited to: ${allow.join(", ")}.`
            : "Your account has no role assigned yet. An administrator needs to grant you one."
        }
      >
        {role && (
          <a className="btn btn--primary" href={ROLE_HOME[role]}>
            Go to your dashboard
          </a>
        )}
      </PageHeader>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
