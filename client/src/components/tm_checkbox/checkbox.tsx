import './checkbox.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC, ReactElement } from 'react';

import { BsCheckSquare, BsSquare } from 'react-icons/bs';

interface ITMCheckbox {
  isActive: boolean,
  textBlock: string | ReactElement,
  toggleIsActive: () => void,

  classNames?: string[],
  isDisabled?: boolean,
};

const TMCheckbox: FC<ITMCheckbox> = ({
  isActive,
  textBlock,
  toggleIsActive,

  classNames = [],
  isDisabled = false,
}) => (
  <div className={['tm-checkbox', isDisabled ? 'disabled' : '', ...classNames].join(' ')}>
    <RichButton
      classNames={['off-black']}
      onClick={toggleIsActive}
      isDisabled={isDisabled}
      size={RichButtonSize.Small}
      type={RichButtonType.Icon}
    >
      {isActive ? <BsCheckSquare /> : <BsSquare />}
    </RichButton>
    <div className='sub-header-text text-block-container'>
      {textBlock}
    </div>
  </div>
);

export default TMCheckbox;
