import './index.scss';

import { FC, ReactElement } from 'react';

import TMButton, { ButtonType, ButtonSize } from 'components/tm_button';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

interface ITMCheckbox {
  isActive: boolean,
  textBlock: string | ReactElement,

  classNames?: string[],
  isDisabled?: boolean,

  toggleIsActive: () => void,
};

const TMCheckbox: FC<ITMCheckbox> = ({
  isActive,
  textBlock,

  classNames = [],
  isDisabled = false,

  toggleIsActive,
}) => {
  if (isDisabled) classNames.push('disabled');

  return (
    <div className={['tm-checkbox', ...classNames].join(' ')}>
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
};

export default TMCheckbox;
