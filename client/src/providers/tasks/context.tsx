import { createContext } from 'react';

interface TasksContextType {
  activeTask?: Task,
  attachmentTypes?: AttachmentType[],
  searchedTasks?: Task[],
  statusTypes?: Status[],
  tags?: Tag[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTaskById: (taskId: string) => void,
  deleteTaskById: (taskId: string) => void,
  updateActiveTask: (task?: Task) => void,
  updateTaskInTasks: (updatedTask: Task) => void,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
