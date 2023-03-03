import { createContext, FC, KeyboardEvent, ReactElement, useContext } from 'react';

import { useKeyStroke } from 'hooks';
import { useSections, useTasks } from 'providers';
import { SectionType } from 'types/constants/tasks';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { useCallback } from 'react';

const { sections: sectionKeys } = SHIFT_KEY_STROKES;

interface SectionsHotkeysContextProps {
};

const SectionsHotkeysContext = createContext<undefined | SectionsHotkeysContextProps>(undefined);

interface SectionsHotkeysProviderProps {
  children: ReactElement,
};

const SectionsHotkeysProvider: FC<SectionsHotkeysProviderProps> = ({ children }) => {
  // state derived from external props
  const {
    activeSection,
    setActiveSection,
    setCollapseState,
    toggleSectionCollapseState
  } = useSections();
  const { isShowingArchivedTasks } = useTasks();
  const orderedSections = isShowingArchivedTasks
    ? Object.keys(SectionType)
    : Object.keys(SectionType).filter(key => key !== SectionType.Archived);

  const handleKeyStrokes = useCallback((event: KeyboardEvent<any>) => {
    switch (event.key) {
      case sectionKeys.collapseAll:
        setCollapseState(new Map(orderedSections.map(section => [section, false])));
        break;
      case sectionKeys.expandAll:
        setCollapseState(new Map(orderedSections.map(section => [section, true])));
        break;
      case sectionKeys.goToNext:
        const activeNextIndex = orderedSections.findIndex(x => x === activeSection);
        if (activeNextIndex < orderedSections.length - 1) {
          setActiveSection(orderedSections[activeNextIndex + 1] as keyof SectionType);
        }
        break;
      case sectionKeys.goToPrevious:
        const activePrevIndex = orderedSections.findIndex(x => x === activeSection);
        if (activePrevIndex > 0) {
          setActiveSection(orderedSections[activePrevIndex - 1] as keyof SectionType);
        }
        break;
      case sectionKeys.toggleCollapseState:
        toggleSectionCollapseState(activeSection.toString());
        break;
    }
  }, [activeSection, orderedSections, setActiveSection, setCollapseState, toggleSectionCollapseState]);

  useKeyStroke(
    [
      { shiftKey: true, key: sectionKeys.collapseAll },
      { shiftKey: true, key: sectionKeys.expandAll },
      { shiftKey: true, key: sectionKeys.goToNext },
      { shiftKey: true, key: sectionKeys.goToPrevious },
      { shiftKey: true, key: sectionKeys.toggleCollapseState },
    ],
    handleKeyStrokes,
  );

  return (
    <SectionsHotkeysContext.Provider value={{}}>
      {children}
    </SectionsHotkeysContext.Provider>
  );
};

const useSectionsHotkeys = () => {
  const context = useContext(SectionsHotkeysContext);
  if (context === undefined) {
    throw new Error('useSectionsHotkeys should only be used within the SectionsHotkeysProvider.');
  }
  return context;
}

export {
  SectionsHotkeysContext,
  SectionsHotkeysProvider,
  useSectionsHotkeys,
};
