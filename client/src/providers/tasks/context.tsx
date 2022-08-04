import { createContext } from 'react';

interface TasksContextType {
  activeTaskId?: string,
  attachmentTypes?: AttachmentType[],
  isShowingArchivedTasks: boolean,
  statusTypes?: Status[],
  tags?: Tag[],
  tasks?: Task[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTaskById: (taskId: string) => void,
  createTask: () => void,
  createTag: (createTagDTO: CreateTagDTO) => void,
  deleteTag: (tagId: string) => void,
  deleteTaskById: (taskId: string) => void,
  setIsShowingArchivedTasks: (isShowingArchivedTasks: boolean) => void,
  updateActiveTaskId: (id?: string) => void,
  updateTag: (tagId: string, updateTagDTO: UpdateTagDTO) => void,
  updateTaskInTasks: (updatedTask: Task) => void,
};

const TasksContext = createContext<undefined | TasksContextType>(undefined);

export default TasksContext;
