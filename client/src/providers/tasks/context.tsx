import { createContext } from 'react';

interface TasksContextType {
  tags?: Tag[],
  tasks?: Task[],
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
