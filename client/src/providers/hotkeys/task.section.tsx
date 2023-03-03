import { createContext, FC, KeyboardEvent, ReactElement, useContext } from 'react';

import { useKeyStroke } from 'hooks';
import { useSections, useTasks } from 'providers';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { SectionType } from 'types/constants/tasks';

const { section: sectionKeys } = SHIFT_KEY_STROKES;

interface SectionHotKeysContextProps {
};

const SectionHotKeysContext = createContext<undefined | SectionHotKeysContextProps>(undefined);

interface SectionHotkeysProviderProps {
  children: ReactElement,
  sectionType: SectionType,
};

const SectionHotkeysProvider: FC<SectionHotkeysProviderProps> = ({ children, sectionType }) => {
  const { activeSection } = useSections();
  const { activeTaskId, taskMap, updateActiveTaskId } = useTasks();
  const sectionTasks = taskMap.get(SectionType[sectionType]);

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case sectionKeys.grabTask:
        if (sectionType.toString() === activeSection && sectionTasks?.length) {
          updateActiveTaskId(sectionTasks[0].id);
        }
        break;
      case sectionKeys.previous:
        if (activeTaskId) {
          const taskSectionWithActiveTaskId = Object.keys(SectionType).find(
            section => taskMap.get(section).find(task => task.id === activeTaskId)
          );
          const tasks = taskMap.get(taskSectionWithActiveTaskId);
          const activeTaskIndex = tasks.findIndex(x => x.id === activeTaskId);
          if (activeTaskIndex > 0) updateActiveTaskId(tasks[activeTaskIndex - 1].id);
        }
        break;
      case sectionKeys.next:
        if (activeTaskId) {
          const taskSectionWithActiveTaskId = Object.keys(SectionType).find(
            section => taskMap.get(section).find(task => task.id === activeTaskId)
          );
          const tasks = taskMap.get(taskSectionWithActiveTaskId);
          const activeTaskIndex = tasks.findIndex(x => x.id === activeTaskId);
          if (activeTaskIndex < tasks.length - 1) updateActiveTaskId(tasks[activeTaskIndex + 1].id);
        }
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: sectionKeys.grabTask },
      { shiftKey: true, key: sectionKeys.previous },
      { shiftKey: true, key: sectionKeys.next },
    ],
    handleKeyStrokes,
  );

  const value = {};

  return (
    <SectionHotKeysContext.Provider value={value}>
      {children}
    </SectionHotKeysContext.Provider>
  );
};

const useSectionHotkeys = () => {
  const context = useContext(SectionHotKeysContext);
  if (context === undefined) {
    throw new Error('useSectionHotkeys should only be used within the SectionHotkeysProvider.');
  }
  return context;
}

export {
  SectionHotkeysProvider,
  useSectionHotkeys,
};
