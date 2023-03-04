import './checkbox.scss';

import { FC, ReactElement } from 'react';

import TMButton, { ButtonType, ButtonSize } from 'components/tm_button';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

interface TMCheckboxProps {
  isActive: boolean,
  textBlock: string | ReactElement,
  toggleIsActive: () => void,

  classNames?: string[],
  isDisabled?: boolean,
};

const TMCheckbox: FC<TMCheckboxProps> = ({
  isActive,
  textBlock,
  toggleIsActive,

  classNames = [],
  isDisabled = false,
}) => (
  <div className={['tm-checkbox', isDisabled ? 'disabled' : '', ...classNames].join(' ')}>
    <TMButton
      classNames={['off-black']}
      onClick={toggleIsActive}
      isDisabled={isDisabled}
      size={ButtonSize.small}
      type={ButtonType.icon}
    >
      {isActive ? <BsCheckSquare /> : <BsSquare />}
    </TMButton>
    <div className='sub-header-text text-block-container'>
      {textBlock}
    </div>
  </div>
);

export default TMCheckbox;
