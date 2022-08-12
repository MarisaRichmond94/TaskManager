import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TaskHotkeysContext from 'providers/hotkeys/tasks/context';
import { useSearchTasks } from 'providers/search/tasks';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';

const { CLOSE_ACTIVE_TASK_KEY, FOCUS_SEARCH_KEY, NEW_TASK_KEY, TOGGLE_SORT_KEY } = HOT_KEYS;

interface ITaskHotkeysProvider {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<ITaskHotkeysProvider> = ({ children }) => {
  const { activeTaskId, createTask, updateActiveTaskId } = useTasks();
  const { isAsc, searchInputRef, updateSortOrder } = useSearchTasks();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case CLOSE_ACTIVE_TASK_KEY:
        if (activeTaskId) updateActiveTaskId(undefined);
        break;
      case FOCUS_SEARCH_KEY:
        event.preventDefault();
        searchInputRef?.current?.focus();
        break;
      case NEW_TASK_KEY: createTask(); break;
      case TOGGLE_SORT_KEY: updateSortOrder(!isAsc);
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: CLOSE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: FOCUS_SEARCH_KEY },
      { shiftKey: true, key: NEW_TASK_KEY },
      { shiftKey: true, key: TOGGLE_SORT_KEY },
    ],
    handleKeyStrokes,
  );

  const value = {};

  return (
    <TaskHotkeysContext.Provider value={value}>
      {children}
    </TaskHotkeysContext.Provider>
  );
};

export default TaskHotkeysProvider;
