import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * A client-side route change keeps the previous scroll position, so navigating
 * from halfway down one page lands halfway down the next. This resets it.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
