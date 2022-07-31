import { useEffect } from 'react';

function useOnClickOutside(ref, handler, additionalTargets = []) {
  console.log(additionalTargets)
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) return;
        if (additionalTargets?.length) {
          for (let index = 0; index < additionalTargets.length; index++) {
            console.log(additionalTargets[index]?.current, event.target)
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
