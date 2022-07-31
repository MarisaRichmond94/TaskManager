import { useEffect } from 'react';

function useOnClickOutside(ref, handler, additionalTargets = []) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) return;
        if (additionalTargets?.length) {
          for (let index = 0; index < additionalTargets.length; index++) {
            if (additionalTargets[index]?.current?.contains(event.target)) return;
          }
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [additionalTargets, handler, ref]
  );
};

export default useOnClickOutside;
