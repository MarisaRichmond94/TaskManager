import { createContext } from 'react';

interface ITasksContext {
  activeTaskId?: string,
  attachmentTypes?: AttachmentType[],
  isShowingArchivedTasks: boolean,
  statusTypes?: Status[],
  tags?: Tag[],
  tasks?: Task[],
  taskTemplates?: TaskTemplate[],
  taskMap?: Map<string, Task[]>,
  userTaskDataLoaded: boolean,
  archiveTaskById: (taskId: string) => void,
  createTask: (body: CreateTaskDTO) => void,
  createTag: (createTagDTO: CreateTagDTO) => void,
  deleteTag: (tagId: string) => void,
  deleteTaskById: (taskId: string) => void,
  updateActiveTaskId: (id?: string) => void,
  updateIsShowingArchivedTasks: (isShowingArchivedTasks: boolean) => void,
  updateTag: (tagId: string, updateTagDTO: UpdateTagDTO) => void,
  updateTaskInTasks: (updatedTask: Task) => void,
};

const TasksContext = createContext<undefined | ITasksContext>(undefined);

export default TasksContext;
