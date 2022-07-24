import './index.scss';

import { FC, ReactElement, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface ITMCollapsableSection {
  children: ReactElement,
  classNames?: string[],
  id: string,
  initiallyVisible: boolean,
  rightBlock?: ReactElement,
  sectionTitle: string,
  wholeHeaderClickable?: boolean,
  onToggleCallback?: () => void,
};

const TMCollapsableSection: FC<ITMCollapsableSection> = ({
  children,
  classNames = [],
  rightBlock,
  id,
  initiallyVisible,
  sectionTitle,
  wholeHeaderClickable,
  onToggleCallback,
}) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    setIsVisible(initiallyVisible);
  }, [initiallyVisible]);

  if (wholeHeaderClickable) classNames.push('clickable-header');

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

export default TMCollapsableSection;
