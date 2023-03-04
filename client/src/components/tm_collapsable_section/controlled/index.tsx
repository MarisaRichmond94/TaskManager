import { FC, MutableRefObject, ReactElement, useState } from 'react';

import TMCollapsableSection from 'components/tm_collapsable_section';

interface TMControlledCollapsableSectionProps {
  children: ReactElement,
  id: string,
  initiallyVisible: boolean,
  sectionTitle: string,

  classNames?: string[],
  reference?: MutableRefObject<any>,
  rightBlock?: ReactElement,
  wholeHeaderClickable?: boolean,

  onToggleCallback?: () => void,
};

const TMControlledCollapsableSection: FC<TMControlledCollapsableSectionProps> = ({
  initiallyVisible,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  return <TMCollapsableSection { ...props } isVisible={isVisible} setIsVisible={setIsVisible} />;
};

export default TMControlledCollapsableSection;
