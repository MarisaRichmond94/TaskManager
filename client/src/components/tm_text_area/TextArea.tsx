import './TextArea.scss';

import { FC, MutableRefObject, useCallback, useEffect, useState } from 'react';

interface TMTextAreaProps {
  autoFocus?: boolean,
  classNames?: string[],
  id?: string,
  initialValue?: string,
  managedValue?: string,
  placeholder?: string,
  reference?: MutableRefObject<any>,
  rowCount?: number,

  onKeyPressCallback?: (e: object, unmanagedValue: string) => void,
  updateManagedValue?: (input: string) => void,
  validateFormValue?: (input: string) => void,
};

const TMTextArea: FC<TMTextAreaProps> = ({
  autoFocus = false,
  classNames = [],
  id,
  initialValue,
  managedValue,
  placeholder = 'type here...',
  reference,
  rowCount,

  onKeyPressCallback,
  updateManagedValue,
  validateFormValue,
}) => {
  const [unmanagedValue, setUnmanagedValue] = useState<string | undefined>(initialValue);

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
  }, [])

  useEffect(() => { if (reference?.current) listener(); }, [listener, reference]);

  if (managedValue && initialValue) {
    throw new Error('TMTextArea received both managed and unmanaged props.');
  }

  const onChange = (input: string): void => {
    !!updateManagedValue ? updateManagedValue(input) : setUnmanagedValue(input);
    if (validateFormValue) validateFormValue(input);
  };

  const onKeyPress = (e: any): void => {
    if (e.key === 'Enter') e.preventDefault();
    if (onKeyPressCallback) onKeyPressCallback(e, unmanagedValue);
  };

  return (
    <textarea
      autoComplete='none'
      className={['tm-form-input', 'tm-text-area', ...classNames].join(' ')}
      id={id}
      name={Math.random().toString()} // prevents auto complete in Chrome
      onChange={e => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      ref={reference}
      rows={rowCount || 3}
      spellCheck='false'
      value={managedValue ?? unmanagedValue}
    />
  );
};

export default TMTextArea;
