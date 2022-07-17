import { ReactElement, useState } from 'react';

interface TMTextAreaProps {
  classNames?: string[],
  id?: string,
  managedValue?: string,
  placeholder?: string,
  rowCount?: number,
  setFormValue?: (input: string) => void,
  validateFormValue?: (input: string) => void
};

const TMTextArea = ({
  classNames = [],
  id,
  managedValue,
  placeholder = 'type here...',
  rowCount,
  setFormValue,
  validateFormValue,
}: TMTextAreaProps): ReactElement => {
  const [unmanagedValue, setUnmanagedValue] = useState<string>('');

  const onChange = (input: string): void => {
    if (setFormValue) {
      setFormValue(input);
      if (validateFormValue) validateFormValue(input);
    } else setUnmanagedValue(input);
  };

  return (
    <textarea
      autoComplete='none'
      className={['tm-form-input', 'tm-text-area', 'sub-header-text', ...classNames].join(' ')}
      id={id}
      name={Math.random().toString()} // prevents auto complete in Chrome
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rowCount | 3}
      spellCheck='false'
      value={managedValue || unmanagedValue}
    />
  );
};

export default TMTextArea;
