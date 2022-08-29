import './index.scss';

import { FC, ReactElement } from 'react';

interface ITMButton {
  children: string | ReactElement | ReactElement[],

  buttonStyle?: ButtonStyle,
  classNames?: string[],
  isDisabled?: boolean,
  size?: ButtonSize,

  onClick: (event: any) => void,
};

export enum ButtonSize {
  extraSmall = 'extra-small',
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extra-large',
};

export enum ButtonStyle {
  icon = 'icon',
  outline = 'outline',
  outlinepill = 'outlinepill',
  pill = 'pill',
  solid = 'solid',
  underline = 'underline',
};

enum TRANSPARENT_STYLES {
  icon = 'icon',
  outline = 'outline',
  outlinepill = 'outlinepill',
  underline = 'underline',
};

const TMButton: FC<ITMButton> = ({
  children,

  buttonStyle = ButtonStyle.solid,
  classNames = [],
  isDisabled = false,
  size = ButtonSize.medium,

  onClick,
}) => {
  const transparent = buttonStyle in TRANSPARENT_STYLES ? 'transparent' : '';

  return (
    <button
      className={['tm-button', size, buttonStyle, transparent, ...classNames].join(' ')}
      type='button'
      onClick={(event: any) => onClick(event)}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default TMButton;
