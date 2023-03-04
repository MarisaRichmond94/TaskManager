import './index.scss';

import { forwardRef, useState } from 'react';
import { ImSearch } from 'react-icons/im';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';

enum InputTypes {
  search = 'search',
};

interface TMInputProps {
  classNames?: string[],
  clearKey?: string,
  formValue?: string,
  id?: string,
  placeholder?: string,
  type?: string,

  onChangeCallback?: (input: string) => void,
  onKeyPressCallback?: (e: object) => void,
  onFocusCallback?: (e: any) => void,
  validateFormValue?: (input: string) => void,
};

type Ref = HTMLInputElement;

const TMInput = forwardRef<Ref, TMInputProps>(({
  classNames = [],
  clearKey,
  formValue,
  id = '',
  placeholder = '',
  type = 'text',

  onChangeCallback,
  onFocusCallback,
  onKeyPressCallback,
  validateFormValue,
}, ref) => {
  const [value, setValue] = useState<string>('');

  const onChange = (input: string): void => {
    if (onChangeCallback) {
      onChangeCallback(input);
      if (validateFormValue) validateFormValue(input);
    } else {
      setValue(input);
    }
  };

  const onKeyPress = (e: any): void => {
    if (e.key === 'Enter') e.preventDefault();
    if (onKeyPressCallback) {
      onKeyPressCallback(e);
      if (clearKey && e.key === clearKey) setValue('');
    }
  };

  const getClassNames = (): string[] => {
    switch (type) {
      case `${InputTypes.search}`: return ['tm-search-input'];
      default: return [];
    }
  };

  return (
    <form>
      <input
        autoComplete='none'
        className={['tm-input', 'sub-header-text', ...getClassNames(), ...classNames].join(' ')}
        id={id}
        name={Math.random().toString()}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocusCallback}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        spellCheck='false'
        ref={ref}
        type={type}
        value={formValue || value}
      />
      {
        type === `${InputTypes.search}` &&
        <TMButton onClick={() => {}} size={ButtonSize.small} type={ButtonType.icon}>
          <ImSearch />
        </TMButton>
      }
    </form>
  );
});

export default TMInput;
