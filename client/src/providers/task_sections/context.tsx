import { createContext } from 'react';
import { SectionType } from 'types/constants/tasks';

interface ISectionsContext {
  activeSection: keyof SectionType,
  collapseState: Map<string, boolean>,
  setActiveSection: (activeSection: keyof SectionType) => void,
  setCollapseState: (collapseState: Map<string, boolean>) => void,
  toggleSectionCollapseState: (sectionType: string) => void,
};

const SectionsContext = createContext<undefined | ISectionsContext>(undefined);

export default SectionsContext;
