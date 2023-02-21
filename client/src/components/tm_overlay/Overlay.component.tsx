import './Overlay.styling.scss';

import { FC } from 'react';

interface TMOverlayProps {
  onCloseCallback: () => void,
  classNames?: string[],
};

const TMOverlay: FC<TMOverlayProps> = ({
  onCloseCallback,
  classNames = [],
}) => (
  <div
    className={['tm-overlay', ...classNames].join(' ')}
    onClick={onCloseCallback}
  />
);

export default TMOverlay;
