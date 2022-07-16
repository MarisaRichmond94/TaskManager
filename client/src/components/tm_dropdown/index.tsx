import './index.scss';

import { ReactElement, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface TMDropdownProps {
  classNames?: string[],
  isDisabled?: boolean,
  onOptionSelect?: (option: DropdownOption) => void,
  options?: DropdownOption[],
  placeholder?: string,
  selectedOption?: DropdownOption,
};

const TMDropdown = ({
  classNames = [],
  isDisabled = false,
  onOptionSelect,
  options,
  placeholder = 'Select from the dropdown',
  selectedOption,
}: TMDropdownProps): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const activeInputText = selectedOption?.displayName || placeholder;

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
          onClick={() => onOptionSelect(option)}
        >
          {option.displayName}
        </span>
      );
    });
  };

  return (
    <div className={['tm-dropdown', ...classNames].join(' ')}>
      <button
        className={`tm-dropdown-button sub-header-text ${isVisible ? 'menu-visible' : 'menu-hidden'}`}
        disabled={isDisabled}
        onClick={() => setIsVisible(!isVisible)}
      >
        <div title={activeInputText}>{activeInputText}</div>
        {isVisible ? <BsChevronUp /> : <BsChevronDown />}
      </button>
      <div className={`tm-dropdown-menu ${isVisible ? 'visible' : 'hidden'}`}>
        {populateDropdownOptions()}
      </div>
    </div>
  );
};

export default TMDropdown;
