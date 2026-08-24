import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

/**
 * Shared chrome for every route: header, main landmark and footer.
 * Pages render into <Outlet /> and only own their own content.
 */
const Layout = () => (
  <>
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
    <ScrollToTop />
    <Navbar />
    <main id="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
