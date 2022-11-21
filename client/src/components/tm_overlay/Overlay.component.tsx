import './Overlay.component.scss';

import { FC, PropsWithChildren } from 'react';

interface ITMOverlay {
  isOverlayActive: boolean,
  toggleIsOverlayActive: () => void,

  classNames?: string[],
};

const TMOverlay: FC<PropsWithChildren<ITMOverlay>> = ({
  children,
  isOverlayActive,
  toggleIsOverlayActive,

  classNames = [],
}) => {
  if (!isOverlayActive) return <>{children}</>;

  return (
    <div className={['tm-overlay', ...classNames].join(' ')}>
      <div className='overlay-background' onClick={toggleIsOverlayActive} />
      <div className='overlay-container'>
        {children}
      </div>
    </div>
  );
};

export default TMOverlay;
