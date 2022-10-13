import './index.scss';

import { FC, ReactElement } from 'react';

interface ITMButton {
  children: string | ReactElement | ReactElement[],
  onClick: (event: any) => void,
  buttonStyle?: ButtonStyle,
  classNames?: string[],
  isDisabled?: boolean,
  size?: ButtonSize,
  style?: object,
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
  onClick,
  buttonStyle = ButtonStyle.solid,
  classNames = [],
  isDisabled = false,
  size = ButtonSize.medium,
  style = {},
}) => {
  const transparent = buttonStyle in TRANSPARENT_STYLES ? 'transparent' : '';

  return (
    <button
      className={['tm-button', size, buttonStyle, transparent, ...classNames].join(' ')}
      type='button'
      onClick={(event: any) => onClick(event)}
      disabled={isDisabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default TMButton;
