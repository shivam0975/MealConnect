import { useEffect, useId, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useMediaQuery from "../../hooks/useMediaQuery";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo1.png";
import "./Navbar.css";

/** Shown to everybody, signed in or not. */
const PUBLIC_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

/** Added for the signed-in account, based on its role. */
const ROLE_LINKS = {
  restaurant: [
    { to: "/restaurants", label: "Dashboard" },
    { to: "/add-donation", label: "Add Donation" },
  ],
  ngo: [{ to: "/ngos", label: "Dashboard" }],
  admin: [
    { to: "/admin", label: "Dashboard" },
    { to: "/manage-donations", label: "Moderate" },
  ],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * The drawer only exists below the tablet breakpoint. Deriving `isOpen` from
   * the media query rather than syncing it in an effect means rotating a phone
   * into landscape cannot leave the page scroll-locked behind an invisible
   * drawer.
   */
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDrawerOpen = isOpen && isMobile;

  // Escape closes the drawer, and the page behind it must not scroll while open.
  useEffect(() => {
    if (!isDrawerOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen]);

  const links = [...PUBLIC_LINKS, ...(role ? (ROLE_LINKS[role] ?? []) : [])];

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="MealConnect home">
          <img src={logo} alt="MealConnect" className="navbar__logo" />
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isDrawerOpen}
          aria-controls={menuId}
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          id={menuId}
          className={`navbar__nav ${isDrawerOpen ? "is-open" : ""}`}
          aria-label="Main"
        >
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <span className="navbar__account">
            {isAuthenticated ? (
              <>
                <span className="navbar__whoami" title={user?.email}>
                  {user?.userMetadata?.full_name || user?.email}
                  {role && <span className="navbar__role">{role}</span>}
                </span>
                <button
                  type="button"
                  className="btn btn--sm btn--secondary"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn--sm btn--primary"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            )}
          </span>
        </nav>
      </div>

      {/* Tapping outside the drawer closes it. Hidden from assistive tech
          because Escape and the labelled toggle already cover that path. */}
      {isDrawerOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
