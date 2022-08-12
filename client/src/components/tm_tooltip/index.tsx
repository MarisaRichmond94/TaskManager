import './index.scss';

import { FC, ReactElement, useState } from 'react';

export enum TooltipDirection {
  bottom = 'bottom',
  bottomLeft = 'bottom-left',
  left = 'left',
  right = 'right',
  top = 'top',
};

interface ITMTooltip {
  children: ReactElement,
  classNames?: string[],
  content: ReactElement | string,
  delay?: number,
  direction?: TooltipDirection,
  id: string,
};

const TMTooltip: FC<ITMTooltip> = ({
  children,
  classNames = [],
  content,
  delay = 500,
  direction = TooltipDirection.top,
  id,
}) => {
  let timeout;

  const [isActive, setIsActive] = useState(false);

  const showTooltip = () => {
    timeout = setTimeout(() => { setIsActive(true); }, delay);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setIsActive(false);
  };

  return (
    <div
      className={['tm-tooltip', ...classNames].join(' ')}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      id={id}
    >
      {children}
      {
        isActive &&
        <div className={['tooltip-content', direction].join(' ')}>
          {content}
        </div>
      }
    </div>
  );
};

export default TMTooltip;
