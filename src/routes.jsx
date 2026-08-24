/**
 * Central route table.
 *
 * `roles` marks a route as protected:
 *   undefined      public
 *   []             any signed-in account
 *   ["admin", ...] only those roles
 *
 * App.jsx groups routes by that field and wraps the protected ones in
 * <ProtectedRoute>. The guard is for usability — the Netlify Functions in
 * netlify/functions re-check the caller's role before touching data.
 */

import Homepage from "./pages/Home/Homepage";
import Login from "./pages/Auth/Login";

import RestaurantDashboard from "./pages/Restaurants/RestaurantDashboard";
import AddDonation from "./pages/Restaurants/AddDonation";
import NGODashboard from "./pages/Ngos/NGODashboard";
import AdminPanel from "./pages/Admin/AdminPanel";
import ManageDonations from "./pages/Admin/ManageDonations";

import VolunteerSignup from "./pages/Volunteer/VolunteerSignup";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";

import About from "./pages/Info/About";
import Donate from "./pages/Info/Donate";
import Faq from "./pages/Info/Faq";
import Privacy from "./pages/Info/Privacy";
import Terms from "./pages/Info/Terms";
import Partner from "./pages/Info/Partner";
import Events from "./pages/Info/Events";
import Careers from "./pages/Info/Careers";
import Support from "./pages/Info/Support";

const routes = [
  // ---------------------------------------------------------------- public
  { path: "/", component: Homepage, index: true },
  { path: "/login", component: Login },

  { path: "/about", component: About },
  { path: "/blog", component: Blog },
  { path: "/contact", component: Contact },
  { path: "/donate", component: Donate },
  { path: "/volunteer", component: VolunteerSignup },
  { path: "/faq", component: Faq },
  { path: "/privacy", component: Privacy },
  { path: "/terms", component: Terms },
  { path: "/partner", component: Partner },
  { path: "/events", component: Events },
  { path: "/careers", component: Careers },
  { path: "/support", component: Support },

  // ------------------------------------------------------------- protected
  { path: "/restaurants", component: RestaurantDashboard, roles: ["restaurant"] },
  { path: "/add-donation", component: AddDonation, roles: ["restaurant"] },
  { path: "/ngos", component: NGODashboard, roles: ["ngo"] },
  { path: "/admin", component: AdminPanel, roles: ["admin"] },
  { path: "/manage-donations", component: ManageDonations, roles: ["admin"] },
];

export const publicRoutes = routes.filter((route) => !route.roles);
export const protectedRoutes = routes.filter((route) => route.roles);

export default routes;
