import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop resets the window scroll position to top (0, 0)
 * whenever the pathname changes. Placed inside BrowserRouter.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
