import './index.scss';

import { FC } from 'react';

export interface ITMToggleButton {
  classNames?: string[],
  selected?: boolean,
  selectedText?: string,
  unSelectedText?: String,

  onClick: () => void,
};

export const TMToggleButton: FC<ITMToggleButton> = ({
  classNames = [],
  selected = false,
  selectedText = 'ON',
  unSelectedText = 'OFF',

  onClick,
}) => (
  <div className={['tm-toggle', ...classNames].join(' ')} onClick={() => onClick()}>
    <div className={`tm-toggle-button ${selected ? 'selected' : 'unselected'}`}>
      {selected ? selectedText : unSelectedText}
    </div>
  </div>
);
