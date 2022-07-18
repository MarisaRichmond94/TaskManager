import { useContext } from 'react';

import TaskContext from 'providers/task/context';

const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask should only be used within the TaskProvider.');
  }
  return context;
}

export default useTask;
