import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TaskHotkeysContext from 'providers/hotkeys/task/context';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';

const {
  ARCHIVE_ACTIVE_TASK_KEY, DELETE_ACTIVE_TASK_KEY, PIN_ACTIVE_TASK_KEY,
} = HOT_KEYS;

interface ITaskHotkeysProvider {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<ITaskHotkeysProvider> = ({ children }) => {
  const { activeTaskId, archiveTaskById, deleteTaskById } = useTasks();
  const { isPinned, updateTask } = useTask();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case ARCHIVE_ACTIVE_TASK_KEY:
        if (activeTaskId) archiveTaskById(activeTaskId);
        break;
      case DELETE_ACTIVE_TASK_KEY:
        if (activeTaskId) deleteTaskById(activeTaskId);
        break;
      case PIN_ACTIVE_TASK_KEY:
        if (activeTaskId) updateTask({ isPinned: !isPinned });
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: ARCHIVE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: DELETE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: PIN_ACTIVE_TASK_KEY },
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
