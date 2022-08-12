import './index.scss';

import { FC, MutableRefObject, useCallback, useEffect, useState } from 'react';

interface ITMTextArea {
  autoFocus?: boolean,
  classNames?: string[],
  id?: string,
  initialValue?: string,
  managedValue?: string,
  placeholder?: string,
  reference?: MutableRefObject<any>,
  rowCount?: number,
  onKeyPressCallback?: (e: object, unmanagedValue: string) => void,
  updatedManagedValue?: (input: string) => void,
  validateFormValue?: (input: string) => void
};

const TMTextArea: FC<ITMTextArea> = ({
  autoFocus = false,
  classNames = [],
  id,
  initialValue = '',
  managedValue,
  placeholder = 'type here...',
  reference,
  rowCount,
  onKeyPressCallback,
  updatedManagedValue,
  validateFormValue,
}) => {
  const [unmanagedValue, setUnmanagedValue] = useState<string>(initialValue);

  const listener = useCallback(() => {
    if (reference?.current) reference.current.style.height = `${reference.current.scrollHeight}px`;
  }, [reference]);

  useEffect(() => {
    listener();
    if (autoFocus && reference?.current) {
      const end = reference.current.value.length;
      reference.current.setSelectionRange(end, end);
      reference.current.focus();
    }
    document.addEventListener('input', listener);
    return () => document.removeEventListener('input', listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reference?.current) listener();
  }, [listener, reference]);

  const onChange = (input: string): void => {
    if (updatedManagedValue) {
      updatedManagedValue(input);
      if (validateFormValue) validateFormValue(input);
    } else setUnmanagedValue(input);
  };

  const onKeyPress = (e: any): void => {
    if (e.key === 'Enter') e.preventDefault();
    if (onKeyPressCallback)  onKeyPressCallback(e, unmanagedValue);
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
      value={managedValue || unmanagedValue}
    />
  );
};

export default TMTextArea;
