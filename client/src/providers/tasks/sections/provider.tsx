import { FC, KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import SectionsHotkeysContext from 'providers/hotkeys/task_sections/context';
import { useTasks } from 'providers/tasks';
import { SectionType } from 'types/constants';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { useCallback } from 'react';

const { sections: sectionKeys } = SHIFT_KEY_STROKES;

interface ISectionsHotkeysProvider {
  children: ReactElement,
};

const SectionsHotkeysProvider: FC<ISectionsHotkeysProvider> = ({ children }) => {
  // state derived from external props
  const { activeTaskId, isShowingArchivedTasks, taskMap } = useTasks();
  const orderedSections = isShowingArchivedTasks
    ? Object.keys(SectionType)
    : Object.keys(SectionType).filter(key => key !== SectionType.Archived);

  const isSectionVisibleByDefault = useCallback((sectionType: SectionType): boolean => {
    const sectionTasks = taskMap.get(sectionType);
    if (sectionTasks?.length || sectionTasks?.find(x => x.id === activeTaskId)) return true;
    return false;
  }, [activeTaskId, taskMap]);

  // local state
  const [activeSection, setActiveSection] = useState<keyof SectionType>(
    orderedSections[0] as keyof SectionType
  );
  const [collapseState, setCollapseState] = useState<Map<string, boolean>>(
    new Map(orderedSections.map(section => [section, isSectionVisibleByDefault(section as SectionType)])),
  );

  /**
   * Update activeSection to the final ordered section if it was Archived but isShowingArchivedTasks
   * gets toggled off
   */
  useEffect(() => {
    if (!isShowingArchivedTasks && activeSection.toString() === SectionType.Archived) {
      setActiveSection(orderedSections[orderedSections.length - 1] as keyof SectionType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowingArchivedTasks]);

  /**
   * Update the collapseState of the sections when isShowingArchivedTasks is toggled by maintaining
   * the currently set toggle state
   */
  useEffect(() => {
    if (isShowingArchivedTasks) {
      const collapseStateCopy = new Map(collapseState);
      collapseStateCopy.set(SectionType.Archived, isSectionVisibleByDefault(SectionType.Archived))
      setCollapseState(collapseStateCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowingArchivedTasks]);

  const handleKeyStrokes = useCallback((event: KeyboardEvent<any>) => {
    switch (event.key) {
      case sectionKeys.collapseAll:
        const collapseAllCopy = new Map(orderedSections.map(section => [section, false]));
        setCollapseState(collapseAllCopy);
        break;
      case sectionKeys.expandAll:
        const expandAllCopy = new Map(orderedSections.map(section => [section, true]));
        setCollapseState(expandAllCopy);
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
        const collapseCopy = new Map(collapseState);
        const currState = collapseCopy.get(activeSection.toString());
        collapseCopy.set(activeSection.toString(), !currState);
        setCollapseState(collapseCopy);
        break;
    }
  }, [activeSection, collapseState, orderedSections]);

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

  const value = {
    activeSection: activeSection as keyof SectionType,
    collapseState,
  };

  return (
    <SectionsHotkeysContext.Provider value={value}>
      {children}
    </SectionsHotkeysContext.Provider>
  );
};

export default SectionsHotkeysProvider;
