import { createContext, FC, KeyboardEvent, ReactElement, useContext } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import { useTask, useTasks } from 'providers';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { toServerDatetime } from 'utils/date';

const { task: taskKeys } = SHIFT_KEY_STROKES;

interface TaskHotkeysContextProps {
};

const TaskHotkeysContext = createContext<undefined | TaskHotkeysContextProps>(undefined);

interface TaskHotkeysProviderProps {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<TaskHotkeysProviderProps> = ({ children }) => {
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

const useTaskHotkeys = () => {
  const context = useContext(TaskHotkeysContext);
  if (context === undefined) {
    throw new Error('useTaskHotkeys should only be used within the TaskHotkeysProvider.');
  }
  return context;
}

export {
  TaskHotkeysProvider,
  useTaskHotkeys,
};
