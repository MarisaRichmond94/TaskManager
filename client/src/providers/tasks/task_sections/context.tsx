import { createContext } from 'react';
import { SectionType } from 'types/constants';

interface ISectionsHotkeysContext {
  activeSection: keyof SectionType,
  collapseState: Map<string, boolean>,
};

const SectionsHotkeysContext = createContext<undefined | ISectionsHotkeysContext>(undefined);

export default SectionsHotkeysContext;
