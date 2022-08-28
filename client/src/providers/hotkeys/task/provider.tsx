import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TaskHotkeysContext from 'providers/hotkeys/task/context';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';
import { toServerDatetime } from 'utils/date';

const {
  ARCHIVE_ACTIVE_TASK_KEY, DELETE_ACTIVE_TASK_KEY, PIN_ACTIVE_TASK_KEY,
  PRIORITIZE_ACTIVE_TASK_KEY,
} = HOT_KEYS;

interface ITaskHotkeysProvider {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<ITaskHotkeysProvider> = ({ children }) => {
  const { archiveTaskById, deleteTaskById } = useTasks();
  const { id, isPinned, updateTask } = useTask();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case ARCHIVE_ACTIVE_TASK_KEY:
        archiveTaskById(id);
        break;
      case DELETE_ACTIVE_TASK_KEY:
        deleteTaskById(id);
        break;
      case PIN_ACTIVE_TASK_KEY:
        updateTask({ isPinned: !isPinned });
        break;
      case PRIORITIZE_ACTIVE_TASK_KEY:
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        updateTask({ dueDate: toServerDatetime(date) });
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: ARCHIVE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: DELETE_ACTIVE_TASK_KEY },
      { shiftKey: true, key: PIN_ACTIVE_TASK_KEY },
      { shiftKey: true, key: PRIORITIZE_ACTIVE_TASK_KEY },
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
