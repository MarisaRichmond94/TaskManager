import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TasksHotkeysContext from 'providers/hotkeys/tasks/context';
import { useSearchTasks } from 'providers/search/tasks';
import { useTasks } from 'providers/tasks';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';

const { filter: filterKeys, search: searchKeys, task: taskKeys, tasks: tasksKeys } = SHIFT_KEY_STROKES;

interface ITasksHotkeysProvider {
  children: ReactElement,
};

const TasksHotkeysProvider: FC<ITasksHotkeysProvider> = ({ children }) => {
  const { activeTaskId, createTask, updateActiveTaskId } = useTasks();
  const {
    isAsc, isFilterMenuOpen, searchInputRef,
    setIsFilterMenuOpen, updateSortOrder,
  } = useSearchTasks();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case taskKeys.close:
        if (activeTaskId) updateActiveTaskId(undefined);
        break;
      case filterKeys.focus:
        event.preventDefault();
        setIsFilterMenuOpen(!isFilterMenuOpen);
        break;
      case searchKeys.focus:
        event.preventDefault();
        searchInputRef?.current?.focus();
        break;
      case taskKeys.create:
        createTask({ dueDate: 0, objective: 'Change me' });
        break;
      case tasksKeys.sort:
        updateSortOrder(!isAsc);
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: taskKeys.close },
      { shiftKey: true, key: filterKeys.focus },
      { shiftKey: true, key: searchKeys.focus },
      { shiftKey: true, key: taskKeys.create },
      { shiftKey: true, key: tasksKeys.sort },
    ],
    handleKeyStrokes,
  );

  const value = {};

  return (
    <TasksHotkeysContext.Provider value={value}>
      {children}
    </TasksHotkeysContext.Provider>
  );
};

export default TasksHotkeysProvider;
