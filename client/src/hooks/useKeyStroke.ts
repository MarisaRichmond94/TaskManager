import {
  KeyboardEvent, ReactNode, useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';

/**
 * Listens for a [KeyStroke] in a group of [keyStrokes] and, if a match is detected, will fire off
 * the given [handleKeyStrokeCallback] method
 *
 * @param keyStrokes - a list of [KeyStroke]s to listen for.
 * @param handleKeyStrokeCallback - a callback to fire off whenever any of the [keyStrokes] are
 * detected
 * @param node - (optional) ReactNode to attach listener to as opposed to the global window
 */
const useKeyStroke = (
  keyStrokes: KeyStroke[],
  handleKeyStrokeCallback: (event: KeyboardEvent<any>) => void,
  node?: ReactNode,
) => {
  /**
   * implements callback ref pattern to avoid unnecessary re-renders if the hook's user
   * did not wrap their handler funtion in a useCallback hook
   * See: https://epicreact.dev/the-latest-ref-pattern-in-react/
   */
  const callbackRef = useRef(handleKeyStrokeCallback);
  useLayoutEffect(() => {
    callbackRef.current = handleKeyStrokeCallback;
  });

  const handleKeyPress = useCallback((event: any) => {
    // prevents hotkeys from listening if the user is typing in a text input or a textarea
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target.getAttribute('data-slate-editor') ||
      event.target.getAttribute('data-slate-note')
    ) return;

    type keyOfKeyStroke = keyof typeof keyStrokes;
    const isMatchingKeyStroke = keyStrokes.some(
      keyStroke => (Object.entries(keyStroke) as [keyOfKeyStroke, any]).every(
        ([key, value]) => event[key as keyOfKeyStroke] === value
      )
    );
    if (isMatchingKeyStroke) {
      callbackRef.current(event);
    }
  }, [keyStrokes]);

  useEffect(() => {
    const targetNode = node ?? global;
    // @ts-ignore
    targetNode.addEventListener('keydown', handleKeyPress);
    // @ts-ignore
    return () => targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};

export default useKeyStroke;
