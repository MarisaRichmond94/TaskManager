import './index.scss';

import { ReactElement } from 'react';

import TMButton, { ButtonStyle, ButtonSize } from 'components/tm_button';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

interface TMCheckboxProps {
  classNames?: string[],
  isActive: boolean,
  isDisabled?: boolean,
  textBlock: string | ReactElement,
  toggleIsActive: () => void,
};

const TMCheckbox = ({
  classNames = [],
  isActive,
  isDisabled = false,
  textBlock,
  toggleIsActive,
}: TMCheckboxProps) => {
  if (isDisabled) classNames.push('disabled');

  return (
    <div className={['tm-checkbox', ...classNames].join(' ')}>
      <TMButton
        classNames={['off-black']}
        onClick={toggleIsActive}
        buttonStyle={ButtonStyle.icon}
        isDisabled={isDisabled}
        size={ButtonSize.small}
      >
        {isActive ? <BsCheckSquare /> : <BsSquare />}
      </TMButton>
      <div className='sub-header-text text-block-container'>
        {textBlock}
      </div>
    </div>
  );
};

export default TMCheckbox;
