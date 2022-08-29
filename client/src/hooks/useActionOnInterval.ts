import { useEffect, useRef } from 'react';

/**
 * Performs a [callback] action and then waits for a [delay] before performing that action again.
 * This is useful for performing syncing tasks.
 *
 * @param callback - the action to performed on an interval
 * @param delay - the interval of time to wait between actions
 * @returns - a reference to the interval set on the window
 */
const useActionOnInterval = (callback: () => void, delay: number) => {
  const delayRef = useRef(null);
  const callbackRef = useRef(callback);
  useEffect(() => { callbackRef.current = callback; }, [callback]);

  useEffect(() => {
    const intervalFn = () => callbackRef.current();
    if (typeof delay === 'number') {
      delayRef.current = window.setInterval(intervalFn, delay);
      return () => window.clearInterval(delayRef.current);
    }
  }, [delay]);

  return delayRef;
};

export default useActionOnInterval;
