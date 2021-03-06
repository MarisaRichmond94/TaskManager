import './index.scss';

import { ReactElement, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export interface TMCollapsableSectionProps {
  children: ReactElement,
  classNames?: string[],
  id: string,
  initiallyVisible?: boolean,
  rightBlock?: ReactElement,
  sectionTitle: string,
  wholeHeaderClickable?: boolean,
  onToggleCallback?: () => void,
};

export const TMCollapsableSection = ({
  children,
  classNames = [],
  rightBlock,
  id,
  initiallyVisible = false,
  sectionTitle,
  wholeHeaderClickable = false,
  onToggleCallback,
}: TMCollapsableSectionProps) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  if (wholeHeaderClickable) classNames.push('clickable-header')

  const onToggle = (updatedIsVisible: boolean): void => {
    setIsVisible(updatedIsVisible);
    if (!!onToggleCallback) onToggleCallback();
  };

  return (
    <div id={id} className={['tm-collapsable-section', ...classNames].join(' ')}>
      <div className='header header-text' onClick={wholeHeaderClickable ? () => onToggle(!isVisible) : () => {}}>
        <div className='text-container' onClick={wholeHeaderClickable ? () => {} : () => onToggle(!isVisible)}>
          {
            isVisible
              ? <BsChevronDown />
              : <BsChevronUp  />
          }
          <div className='title hide-overflow-ellipsis'>{sectionTitle}</div>
        </div>
        {rightBlock && <div className='content-float-right'>{rightBlock}</div>}
      </div>
      <hr className='divider'/>
      <div className={isVisible ? 'visible' : 'hidden'}>
        {children}
      </div>
    </div>
  );
};
