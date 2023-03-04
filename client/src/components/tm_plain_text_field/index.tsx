import './index.scss';

import { FC, KeyboardEvent, MutableRefObject, useCallback, useEffect } from 'react';

interface TMPlainTextFieldProps {
  value: string,
  onChangeCallback: (nextInputValue: string) => void,

  autoFocus?: boolean,
  classNames?: string[],
  placeholder?: string,
  reference?: MutableRefObject<any>,
  rowCount?: number,
  onKeyPressCallback?: (event: KeyboardEvent<any>) => void,
};

const TMPlainTextField: FC<TMPlainTextFieldProps> = ({
  value,
  onChangeCallback,

  autoFocus = false,
  classNames = [],
  placeholder = 'type here...',
  reference,
  rowCount = 1,
  onKeyPressCallback,
}) => {
  // dynamically adjusts the textarea to fit the text
  const listener = useCallback(() => {
    if (reference?.current) reference.current.style.height = `${reference.current.scrollHeight}px`;
  }, [reference]);

  useEffect(() => {
    // places the cursor at the end of any text within the textarea
    if (autoFocus && reference?.current) {
      const end = reference.current.value.length;
      reference.current.setSelectionRange(end, end);
      reference.current.focus();
    }

    listener();
    document.addEventListener('input', listener);
    return () => document.removeEventListener('input', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (reference?.current) listener(); }, [listener, reference]);

  const onKeyPressHandler = (event: KeyboardEvent<any>) => {
    if (onKeyPressCallback) onKeyPressCallback(event);
  };

  return (
    <textarea
      autoComplete='none'
      className={['tm-plain-text-field', ...classNames].join(' ')}
      name={Math.random().toString()} // prevents auto complete in Chrome
      onChange={(event: any) => onChangeCallback(event.target.value)}
      onKeyDown={onKeyPressHandler}
      placeholder={placeholder}
      ref={reference}
      rows={rowCount}
      spellCheck
      value={value}
    />
  );
};

export default TMPlainTextField;
