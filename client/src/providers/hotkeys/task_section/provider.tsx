import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import SectionHotkeysContext from 'providers/hotkeys/task_section/context';
import { useSections } from 'providers/task_sections';
import { useTasks } from 'providers/tasks';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { SectionType } from 'types/constants/tasks';

const { section: sectionKeys } = SHIFT_KEY_STROKES;

interface ISectionHotkeysProvider {
  children: ReactElement,
  sectionType: SectionType,
};

const SectionHotkeysProvider: FC<ISectionHotkeysProvider> = ({ children, sectionType }) => {
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
    <SectionHotkeysContext.Provider value={value}>
      {children}
    </SectionHotkeysContext.Provider>
  );
};

export default SectionHotkeysProvider;
