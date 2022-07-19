import { createContext } from 'react';

interface TasksContextType {
  activeTask?: Task,
  attachmentTypes?: AttachmentType[],
  searchedTasks?: Task[],
  statusTypes?: Status[],
  tags?: Tag[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTask: (taskId: string) => void,
  deleteTaskById: (taskId: string) => void,
  updateActiveTask: (task?: Task) => void,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
