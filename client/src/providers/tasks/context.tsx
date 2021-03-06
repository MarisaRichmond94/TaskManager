import { createContext } from 'react';

interface TasksContextType {
  activeTaskId?: string,
  attachmentTypes?: AttachmentType[],
  searchedTasks?: Task[],
  statusTypes?: Status[],
  tags?: Tag[],
  tasks?: Task[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTaskById: (taskId: string) => void,
  deleteTaskById: (taskId: string) => void,
  updateActiveTaskId: (id?: string) => void,
  updateTaskInTasks: (updatedTask: Task) => void,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
