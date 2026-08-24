import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../../assets/images/logo3.png";
import "./Footer.css";

const LINK_GROUPS = [
  {
    heading: "Quick Links",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/donate", label: "Donate" },
      { to: "/volunteer", label: "Volunteer" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { to: "/partner", label: "Partner with Us" },
      { to: "/events", label: "Events" },
      { to: "/careers", label: "Careers" },
      { to: "/support", label: "Support Us" },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <img src={Logo} alt="MealConnect" className="footer__logo" />
        <p className="footer__tagline">
          Feeding Communities <br /> Reducing Waste
        </p>

        <h4 className="footer__heading">Follow Us</h4>
        <ul className="footer__social">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__links">
        {LINK_GROUPS.map(({ heading, links }) => (
          <nav key={heading} className="footer__group" aria-label={heading}>
            <h4 className="footer__heading">{heading}</h4>
            <ul>
              {links.map(({ to, label }) => (
                <li key={to}>
                  {/* Link, not <a href> — these are in-app routes and a raw
                      anchor would trigger a full page reload. */}
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </div>

    <p className="footer__copyright">
      &copy; {new Date().getFullYear()} MealConnect. All rights reserved.
    </p>
  </footer>
);

export default Footer;
