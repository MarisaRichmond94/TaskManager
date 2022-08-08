import {
  KeyboardEvent, ReactNode, useCallback, useEffect, useLayoutEffect, useRef,
} from 'react';

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

  const handleKeyPress = useCallback((event: KeyboardEvent<any>) => {
    // prevents hotkeys from stopping text input into textareas and inputs
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
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
    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    // @ts-ignore
    return () => targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};

export default useKeyStroke;
