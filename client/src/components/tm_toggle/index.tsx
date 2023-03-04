import './index.scss';

import { FC } from 'react';

export interface TMToggleButtonProps {
  classNames?: string[],
  disabled?: boolean,
  selected?: boolean,
  selectedText?: string,
  unSelectedText?: String,

  onClick: () => void,
};

export const TMToggleButton: FC<TMToggleButtonProps> = ({
  classNames = [],
  disabled = false,
  selected = false,
  selectedText = 'ON',
  unSelectedText = 'OFF',

  onClick,
}) => (
  <div
    className={['tm-toggle', disabled ? 'disabled' : '', ...classNames].join(' ')}
    onClick={onClick}
  >
    <div className={`tm-toggle-button ${selected ? 'selected' : 'unselected'}`}>
      {selected ? selectedText : unSelectedText}
    </div>
  </div>
);
