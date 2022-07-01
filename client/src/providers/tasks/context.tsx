import { createContext } from 'react';

interface TasksContextType {
  searchedTasks?: Task[],
  tags?: Tag[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
