import './index.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { forwardRef, useState } from 'react';
import { ImSearch } from 'react-icons/im';

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
  onFocusCallback?: (e: any) => void,
  validateFormValue?: (input: string) => void,
};

type Ref = HTMLInputElement;

const TMInput = forwardRef<Ref, ITMInput>(({
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
        <RichButton onClick={() => {}} size={RichButtonSize.Small} type={RichButtonType.Icon}>
          <ImSearch />
        </RichButton>
      }
    </form>
  );
});

export default TMInput;
