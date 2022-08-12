import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TasksHotkeysContext from 'providers/hotkeys/tasks/context';
import { useSearchTasks } from 'providers/search/tasks';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';

const {
  CLOSE_ACTIVE_TASK_KEY,
  FOCUS_FILTER_KEY, FOCUS_SEARCH_KEY, TOGGLE_SORT_KEY,
  NEW_TASK_KEY,
} = HOT_KEYS;

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
      case CLOSE_ACTIVE_TASK_KEY:
        if (activeTaskId) updateActiveTaskId(undefined);
        break;
      case FOCUS_FILTER_KEY:
        event.preventDefault();
        setIsFilterMenuOpen(!isFilterMenuOpen);
        break;
      case FOCUS_SEARCH_KEY:
        event.preventDefault();
        searchInputRef?.current?.focus();
        break;
      case NEW_TASK_KEY:
        createTask();
        break;
      case TOGGLE_SORT_KEY:
        updateSortOrder(!isAsc);
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: CLOSE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: FOCUS_FILTER_KEY },
      { shiftKey: true, key: FOCUS_SEARCH_KEY },
      { shiftKey: true, key: NEW_TASK_KEY },
      { shiftKey: true, key: TOGGLE_SORT_KEY },
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
