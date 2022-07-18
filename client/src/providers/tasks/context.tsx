import { createContext } from 'react';

interface TasksContextType {
  attachmentTypes?: AttachmentType[],
  searchedTasks?: Task[],
  statusTypes?: Status[],
  tags?: Tag[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTaskById: (archivedTask: Task) => void,
  deleteTaskById: (taskId: string) => void,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
