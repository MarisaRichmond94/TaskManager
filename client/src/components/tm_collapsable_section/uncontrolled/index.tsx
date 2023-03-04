import { FC, MutableRefObject, ReactElement } from 'react';

import TMCollapsableSection from 'components/tm_collapsable_section';

interface TMUncontrolledCollapsableSectionProps {
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

const TMUncontrolledCollapsableSection: FC<TMUncontrolledCollapsableSectionProps> = ({ ...props }) => (
  <TMCollapsableSection { ...props } />
);

export default TMUncontrolledCollapsableSection;
