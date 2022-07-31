import './index.scss';

import { FC } from 'react';

export interface ITMToggleButton {
  classNames?: string[],
  onClick: () => void,
  selected?: boolean,
  selectedText?: string,
  unSelectedText?: String,
};

export const TMToggleButton: FC<ITMToggleButton> = ({
  classNames = [],
  onClick,
  selected = false,
  selectedText = 'ON',
  unSelectedText = 'OFF',
}) => (
  <div className={['tm-toggle', ...classNames].join(' ')} onClick={() => onClick()}>
    <div className={`tm-toggle-button ${selected ? 'selected' : 'unselected'}`}>
      {selected ? selectedText : unSelectedText}
    </div>
  </div>
);
