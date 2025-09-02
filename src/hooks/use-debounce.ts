import * as React from "react";

/**
 * useDebouncedValue
 *
 * Returns a debounced copy of a value that only updates after the specified delay.
 * Useful for delaying search queries until the user stops typing.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/**
 * useDebouncedCallback
 *
 * Returns a debounced version of a callback. The debounced function delays invoking
 * the callback until after `delay` milliseconds have elapsed since the last time it was invoked.
 *
 * The returned function also has `.cancel()` and `.flush()` helpers:
 * - cancel(): clears any pending call
 * - flush(...args): immediately invokes the latest callback with the provided args
 */
export function useDebouncedCallback<T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 300
) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const debounced = React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ) as T & { cancel: () => void; flush: (...args: Parameters<T>) => void };

  const flush = ((...args: Parameters<T>) => {
    cancel();
    callbackRef.current(...args);
  }) as (...args: Parameters<T>) => void;

  // Attach helpers for convenience
  (debounced as any).cancel = cancel;
  (debounced as any).flush = flush;

  // Cleanup any pending timeout on unmount
  React.useEffect(() => cancel, [cancel]);

  return debounced;
}

/**
 * useDebouncedSearch
 *
 * Convenience hook for search inputs. Manages a query state, returns a debounced
 * version, and provides an onChange handler for inputs.
 */
export function useDebouncedSearch(initial = "", delay = 300) {
  const [query, setQuery] = React.useState(initial);
  const debouncedQuery = useDebouncedValue(query, delay);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  return { query, setQuery, debouncedQuery, onChange };
}
