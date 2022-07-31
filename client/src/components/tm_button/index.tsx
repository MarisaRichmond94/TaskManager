import './index.scss';

import { ReactElement } from 'react';

export interface TMButtonProps {
  buttonStyle?: `${ButtonStyle}`,
  children: string | ReactElement | ReactElement[],
  classNames?: string[],
  isDisabled?: boolean,
  size?: `${Size}`,
  onClick: (event: any) => void,
};

export enum Size {
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

export const TMButton = ({
  buttonStyle = ButtonStyle.solid,
  children,
  classNames = [],
  isDisabled = false,
  size = Size.medium,
  onClick,
}: TMButtonProps) => {
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
