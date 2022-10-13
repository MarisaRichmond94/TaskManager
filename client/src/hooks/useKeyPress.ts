import { useEffect, useState } from 'react';

/**
 * A hook used to detect a particular [targetKey] press.
 *
 * @param targetKey - The key to track
 * @returns - a boolean representing whether or not the key is currently being pressed.
 */
const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const keyDownHandler = ({ key }: KeyStroke) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const keyUpHandler = ({ key }: KeyStroke) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return keyPressed;
};

export default useKeyPress;
