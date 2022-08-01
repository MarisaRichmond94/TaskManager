import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
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

export default useInterval;
