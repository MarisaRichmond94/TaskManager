import './index.scss';

import { FC, useState } from 'react';
import { ImSearch } from 'react-icons/im';

import { TMButton } from 'components/tm_button';

enum InputTypes {
  search = 'search',
};

interface ITMInput {
  classNames?: string[],
  clearKey?: string,
  formValue?: string,
  id?: string,
  placeholder?: string,
  type?: string,
  onChangeCallback?: (input: string) => void,
  onKeyPressCallback?: (e: object) => void,
  validateFormValue?: (input: string) => void
};

const TMInput: FC<ITMInput> = ({
  classNames = [],
  clearKey,
  formValue,
  id = '',
  placeholder = '',
  type = 'text',
  onChangeCallback,
  onKeyPressCallback,
  validateFormValue,
}) => {
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
        className={['tm-input', 'sub-header-text', ...getClassNames(), ...classNames].join(' ')}
        id={id}
        name={Math.random().toString()}
        onChange={e => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        spellCheck='false'
        type={type}
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

export default TMInput;
