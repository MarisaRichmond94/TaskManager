import { FC, ReactElement, useEffect, useState } from 'react';

import SectionsContext from 'providers/task_sections/context';
import { useTasks } from 'providers/tasks';
import { SectionType } from 'types/constants/tasks';
import { useCallback } from 'react';

interface ISectionsProvider {
  children: ReactElement,
};

const SectionsProvider: FC<ISectionsProvider> = ({ children }) => {
  const { activeTaskId, isShowingArchivedTasks, taskMap } = useTasks();
  const orderedSections = isShowingArchivedTasks
    ? Object.keys(SectionType)
    : Object.keys(SectionType).filter(key => key !== SectionType.Archived);

  const isSectionVisible = useCallback((sectionType: SectionType): boolean => {
    const sectionTasks = taskMap.get(sectionType);
    if (
      sectionType === SectionType.Today ||
      sectionTasks?.length ||
      sectionTasks?.find(x => x.id === activeTaskId)
    ) return true;
  }, [activeTaskId, taskMap]);

  const [activeSection, setActiveSection] = useState<keyof SectionType>(
    orderedSections[0] as keyof SectionType
  );
  const [collapseState, setCollapseState] = useState<Map<string, boolean>>(
    new Map(orderedSections.map(section => [section, isSectionVisible(section as SectionType)])),
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
      collapseStateCopy.set(SectionType.Archived, isSectionVisible(SectionType.Archived))
      setCollapseState(collapseStateCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowingArchivedTasks]);

  /**
   * Updates the collapse state of a section if it contains the active task id and is not already
   * expanded
   */
  useEffect(() => {
    if (!activeTaskId) return;

    const activeTaskSection = orderedSections.find(
      section => taskMap.get(section).find(task => task.id === activeTaskId)
    );
    if (!collapseState.get(activeTaskSection)) {
      const collapseStateCopy = new Map(collapseState);
      collapseStateCopy.set(activeTaskSection, true);
      setCollapseState(collapseStateCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTaskId, taskMap]);

  const toggleSectionCollapseState = useCallback((sectionType: string) => {
    const collapseStateCopy = new Map(collapseState);
    const currState = collapseStateCopy.get(sectionType);
    collapseStateCopy.set(sectionType, !currState);
    setCollapseState(collapseStateCopy);
  }, [collapseState]);

  const value = {
    activeSection: activeSection as keyof SectionType,
    collapseState,
    setActiveSection,
    setCollapseState,
    toggleSectionCollapseState,
  };

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
};

export default SectionsProvider;
