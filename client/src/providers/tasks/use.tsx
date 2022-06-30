import { useContext } from 'react';

import TasksContext from 'providers/tasks/context';

const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks should only be used within the TasksProvider.');
  }
  return context;
}

export default useTasks;
