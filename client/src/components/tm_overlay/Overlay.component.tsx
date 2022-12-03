import './Overlay.component.scss';

import { FC } from 'react';

interface ITMOverlay {
  onCloseCallback: () => void,

  classNames?: string[],
};

const TMOverlay: FC<ITMOverlay> = ({ onCloseCallback, classNames = [] }) =>
  <div className={['tm-overlay', ...classNames].join(' ')} onClick={onCloseCallback} />;

export default TMOverlay;
