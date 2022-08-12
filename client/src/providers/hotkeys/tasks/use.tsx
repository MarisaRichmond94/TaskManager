import { useContext } from 'react';

import TasksHotkeysContext from 'providers/hotkeys/tasks/context';

const useTasksHotkeys = () => {
  const context = useContext(TasksHotkeysContext);
  if (context === undefined) {
    throw new Error('useTasksHotkeys should only be used within the TasksHotkeysProvider.');
  }
  return context;
}

export default useTasksHotkeys;
