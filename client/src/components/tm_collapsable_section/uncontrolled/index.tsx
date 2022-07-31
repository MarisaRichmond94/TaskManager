import { FC, MutableRefObject, ReactElement } from 'react';

import TMCollapsableSection from 'components/tm_collapsable_section';

interface ITMUncontrolledCollapsableSection {
  children: ReactElement,
  classNames?: string[],
  id: string,
  isVisible: boolean,
  reference?: MutableRefObject<any>,
  rightBlock?: ReactElement,
  sectionTitle: string,
  setIsVisible: (isVisible: boolean) => void,
  wholeHeaderClickable?: boolean,
  onToggleCallback?: () => void,
};

const TMUncontrolledCollapsableSection: FC<ITMUncontrolledCollapsableSection> = ({ ...props }) => (
  <TMCollapsableSection { ...props } />
);

export default TMUncontrolledCollapsableSection;
