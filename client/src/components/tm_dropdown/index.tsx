import './index.scss';

import { FC, ReactElement, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import useOnClickOutside from 'hooks/useOnOutsideClick';

interface ITMDropdown {
  classNames?: string[],
  isDisabled?: boolean,
  options?: DropdownOption[],
  placeholder?: string,
  selectedOption?: DropdownOption,

  onOptionSelect?: (option: DropdownOption) => void,
};

const TMDropdown: FC<ITMDropdown> = ({
  classNames = [],
  isDisabled = false,
  options,
  placeholder = 'Select from the dropdown',
  selectedOption,

  onOptionSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const activeInputText = selectedOption?.displayName || placeholder;

  const inputRef = useRef(null);
  useOnClickOutside(inputRef, () => setIsVisible(false));

  const handleOptionSelect = (option: DropdownOption) => {
    onOptionSelect(option);
    setIsVisible(false);
  };

  const populateDropdownOptions = (): ReactElement[] => {
    const dropdownOptions = selectedOption
      ? options.filter(option => option.displayName !== selectedOption.displayName)
      : options

    if (!dropdownOptions || !dropdownOptions.length) {
      return ([
        <span className='sub-header-text tm-dropdown-option'>
          {!dropdownOptions ? 'Loading...' : 'No options available'}
        </span>
      ]);
    }

    return dropdownOptions.map((option, index) => {
      return (
        <span
          className='sub-header-text tm-dropdown-option'
          key={`${option.id}-${index}`}
          onClick={() => handleOptionSelect(option)}
        >
          {option.displayName}
        </span>
      );
    });
  };

  return (
    <div className={['tm-dropdown', ...classNames].join(' ')} ref={inputRef}>
      <div
        className={[
          'tm-dropdown-button',
          'sub-header-text',
          isVisible ? 'menu-visible' : 'menu-hidden',
          isDisabled ? 'disabled' : '',
        ].join(' ')}
        onClick={() => setIsVisible(!isVisible)}
      >
        <div title={activeInputText}>{activeInputText}</div>
        {isVisible ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div className={`tm-dropdown-menu ${isVisible ? 'visible' : 'hidden'}`}>
        {populateDropdownOptions()}
      </div>
    </div>
  );
};

export default TMDropdown;
