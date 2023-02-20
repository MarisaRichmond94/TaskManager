import './button.scss';

import { FC, PropsWithChildren } from 'react';

import { ButtonSize, ButtonType, TransparentTypes } from './types';

interface ITMButton extends PropsWithChildren {
  onClick: (event: any) => void,

  classNames?: string[],
  id?: string,
  isDisabled?: boolean,
  size?: ButtonSize,
  style?: object,
  type?: ButtonType,
};

const TMButton: FC<ITMButton> = ({
  children,
  onClick,

  classNames = [],
  id,
  isDisabled = false,
  size = ButtonSize.medium,
  style = {},
  type = ButtonType.solid,
}) => (
  <button
    className={['tm-button', size, type, type in TransparentTypes ? 'transparent' : '', ...classNames].join(' ')}
    disabled={isDisabled}
    id={id ?? null}
    onClick={(event: any) => onClick(event)}
    style={style}
    type='button'
  >
    {children}
  </button>
);

export default TMButton;
