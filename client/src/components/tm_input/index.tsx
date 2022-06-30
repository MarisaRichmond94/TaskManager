import './index.scss';

import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

import { TMButton } from 'components/tm_button';

export enum InputTypes {
  search = 'search',
};

export interface TMInputProps {
  classNames?: string[],
  clearKey?: string,
  formValue?: string,
  id: string,
  onChangeCallback?: (input: string) => void,
  onKeyPressCallback?: (e: object) => void,
  placeholder: string,
  type?: string,
  validateFormValue?: (input: string) => void
};

export const TMInput = ({
  classNames = [],
  clearKey,
  formValue,
  id,
  onChangeCallback,
  onKeyPressCallback,
  placeholder,
  type,
  validateFormValue,
}: TMInputProps) => {
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
    if (onKeyPressCallback) {
      onKeyPressCallback(e);
      if (clearKey && e.key === clearKey) setValue('');
    }
  };

  const getClassNames = (): string[] => {
    switch (type) {
      case `${InputTypes.search}`:
        return ['tm-search-input'];
      default:
        return [];
    }
  };

  return (
    <form>
      <input
        autoComplete='none'
        className={['tm-input', ...getClassNames(), ...classNames].join(' ')}
        id={id}
        name={Math.random().toString()}
        onChange={e => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        spellCheck='false'
        type={type || 'text'}
        placeholder={placeholder}
        value={formValue || value}
      />
      {
        type === `${InputTypes.search}` &&
        <TMButton buttonStyle='icon' onClick={() => {}} size='small'>
          <ImSearch />
        </TMButton>
      }
    </form>
  );
};
