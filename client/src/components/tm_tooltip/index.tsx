import './index.scss';

import { FC, ReactElement, useState } from 'react';

export enum TooltipDirection {
  bottom = 'bottom',
  bottomLeft = 'bottom-left',
  left = 'left',
  right = 'right',
  top = 'top',
};

interface TMTooltipProps {
  children: ReactElement,
  content: ReactElement | string,
  id: string,

  classNames?: string[],
  delay?: number,
  direction?: TooltipDirection,
  duration?: number,
};

const TMTooltip: FC<TMTooltipProps> = ({
  children,
  content,
  id,

  classNames = [],
  delay = 500,
  direction = TooltipDirection.top,
  duration = 2000,
}) => {
  let showTimeout;
  let hideTimeout;

  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    showTimeout = setTimeout(() => { setIsVisible(true); }, delay);
    hideTimeout = setTimeout(() => { setIsVisible(false); }, delay + duration);
  };

  const hideTooltip = () => {
    clearInterval(showTimeout);
    clearInterval(hideTimeout);
    setIsVisible(false);
  };

  return (
    <div
      className={['tm-tooltip', ...classNames].join(' ')}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      id={id}
    >
      {children}
      <div className={['tooltip-content', isVisible ? 'show' : 'hide', direction].join(' ')}>
        {content}
      </div>
    </div>
  );
};

export default TMTooltip;
