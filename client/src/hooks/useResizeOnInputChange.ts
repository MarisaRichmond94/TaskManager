import { useEffect } from 'react';

function useResizeOnInputChange(ref, inputId) {
  useEffect(
    () => {
      const listener = (event) => {
        if (ref?.current) ref.current.style.height = `${ref.current.scrollHeight}px`;
      };
      document.addEventListener('input', listener);
      return () => document.removeEventListener('input', listener);
    },
    [ref]
  );
};

export default useResizeOnInputChange;
