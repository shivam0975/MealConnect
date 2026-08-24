import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query from JS, for behaviour that CSS alone cannot
 * express. Layout itself should still live in stylesheets.
 *
 * Built on useSyncExternalStore rather than useState + useEffect: matchMedia is
 * an external store, and reading it through this hook avoids the extra render
 * (and the tearing window) that setting state inside an effect introduces.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  // Server render has no viewport; assume the query does not match.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
