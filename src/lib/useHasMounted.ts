import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only once the component has hydrated on the client. Used to defer
 * theme-dependent rendering (next-themes' resolvedTheme is unknown during
 * SSR) until after hydration, without tripping the set-state-in-effect
 * lint rule a plain useState+useEffect("mounted") pattern would.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
