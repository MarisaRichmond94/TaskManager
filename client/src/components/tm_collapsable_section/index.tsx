import './index.scss';

import { FC, MutableRefObject, ReactElement } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface ITMCollapsableSection {
  children: ReactElement,
  id: string,
  isVisible: boolean,
  sectionTitle: string,

  classNames?: string[],
  reference?: MutableRefObject<any>,
  rightBlock?: ReactElement,
  wholeHeaderClickable?: boolean,

  setIsVisible: (isVisible: boolean) => void,
  onToggleCallback?: () => void,
};

const TMCollapsableSection: FC<ITMCollapsableSection> = ({
  children,
  id,
  isVisible,
  sectionTitle,

  classNames = [],
  reference,
  rightBlock,
  wholeHeaderClickable,

  setIsVisible,
  onToggleCallback,
}) => {
  if (wholeHeaderClickable) classNames.push('clickable-header');

  const onToggle = (updatedIsVisible: boolean): void => {
    setIsVisible(updatedIsVisible);
    if (!!onToggleCallback) onToggleCallback();
  };

  return (
    <div id={id} className={['tm-collapsable-section', ...classNames].join(' ')} ref={reference}>
      <div
        className='header header-text'
        onClick={wholeHeaderClickable ? () => onToggle(!isVisible) : () => {}}
      >
        <div
          className='text-container'
          onClick={wholeHeaderClickable ? () => {} : () => onToggle(!isVisible)}
        >
          {isVisible ? <BsChevronDown /> : <BsChevronUp  />}
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