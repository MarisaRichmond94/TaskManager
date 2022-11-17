import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import SectionsHotkeysContext from 'providers/hotkeys/task_sections/context';
import { useSections } from 'providers/task_sections';
import { useTasks } from 'providers/tasks';
import { SectionType } from 'types/constants/tasks';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { useCallback } from 'react';

const { sections: sectionKeys } = SHIFT_KEY_STROKES;

interface ISectionsHotkeysProvider {
  children: ReactElement,
};

const SectionsHotkeysProvider: FC<ISectionsHotkeysProvider> = ({ children }) => {
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

export default SectionsHotkeysProvider;
