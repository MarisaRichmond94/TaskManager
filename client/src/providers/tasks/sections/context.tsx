import { createContext } from 'react';
import { SectionType } from 'types/constants/tasks';

interface ISectionsHotkeysContext {
  activeSection: keyof SectionType,
  collapseState: Map<string, boolean>,
};

const SectionsHotkeysContext = createContext<undefined | ISectionsHotkeysContext>(undefined);

export default SectionsHotkeysContext;
