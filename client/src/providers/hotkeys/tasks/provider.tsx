import { FC, ReactElement } from 'react';

import TaskHotkeysContext from 'providers/hotkeys/tasks/context';

interface ITaskHotkeysProvider {
  children: ReactElement,
};

const TaskHotkeysProvider: FC<ITaskHotkeysProvider> = ({ children }) => {
  const value = {};

  return (
    <TaskHotkeysContext.Provider value={value}>
      {children}
    </TaskHotkeysContext.Provider>
  );
};

export default TaskHotkeysProvider;
