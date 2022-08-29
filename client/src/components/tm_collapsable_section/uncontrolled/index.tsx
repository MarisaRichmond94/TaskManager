import { FC, MutableRefObject, ReactElement } from 'react';

import TMCollapsableSection from 'components/tm_collapsable_section';

interface ITMUncontrolledCollapsableSection {
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

const TMUncontrolledCollapsableSection: FC<ITMUncontrolledCollapsableSection> = ({ ...props }) => (
  <TMCollapsableSection { ...props } />
);

export default TMUncontrolledCollapsableSection;
