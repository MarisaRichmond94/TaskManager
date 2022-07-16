import { createContext } from 'react';

interface TasksContextType {
  attachmentTypes?: AttachmentType[],
  searchedTasks?: Task[],
  statusTypes?: Status[],
  tags?: Tag[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
