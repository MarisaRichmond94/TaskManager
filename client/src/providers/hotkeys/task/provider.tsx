import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import TaskHotkeysContext from 'providers/hotkeys/task/context';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { toServerDatetime } from 'utils/date';

const { task: taskKeys } = SHIFT_KEY_STROKES;

interface ITaskHotkeysProvider {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<ITaskHotkeysProvider> = ({ children }) => {
  const { archiveTaskById, deleteTaskById } = useTasks();
  const { id, isPinned, updateTask } = useTask();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case taskKeys.archive:
        archiveTaskById(id);
        break;
      case taskKeys.delete:
        deleteTaskById(id);
        break;
      case taskKeys.pin:
        updateTask({ isPinned: !isPinned });
        break;
      case taskKeys.prioritize:
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        updateTask({ dueDate: toServerDatetime(date) });
        break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: taskKeys.archive },
      { shiftKey: true, key: taskKeys.delete },
      { shiftKey: true, key: taskKeys.pin },
      { shiftKey: true, key: taskKeys.prioritize },
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
