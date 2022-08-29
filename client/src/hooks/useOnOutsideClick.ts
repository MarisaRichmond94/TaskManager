import { MutableRefObject, useEffect } from 'react';

/**
 * Detects any clicks outside of the given [ref] or [additionalTargets]. When an outside click is
 * detected, the [handler] is called to handle any desired side effects.
 *
 * @param ref - the reference for the input that is being listened to
 * @param handler - the function to handle any side effects resulting from an outside click
 * @param additionalTargets - targets to exclude from the outside click, such as a button that is
 * used to open the menu (ref) because clicking on that button should maintain its usual functionality
 */
const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: any) => void,
  additionalTargets: MutableRefObject<any>[] = [],
) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
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
    [additionalTargets, handler, ref],
  );
};

export default useOnClickOutside;
