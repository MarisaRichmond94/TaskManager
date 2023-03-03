import { useAuth0 } from '@auth0/auth0-react';
import { createContext, FC, ReactElement, useCallback, useContext, useState } from 'react';

import {
  ChecklistItemsApi,
  CommentsApi,
  StatusesApi,
  TaskAttachmentsApi,
  TaskTagsApi,
  TasksApi,
} from 'api';
import { useTasks } from 'providers';

interface TaskContextProps {
  id: string,
  attachments?: Attachment[],
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  createdAt: number,
  description?: string,
  dueDate: number,
  isPinned: boolean,
  objective: string,
  status?: Status,
  tags?: Tag[],
  updatedAt: number,
  newCommentId?: string,
  createAttachment: (createAttachmentDTO: CreateAttachmentDTO) => void,
  createChecklistItem: (createChecklistItemDTO: CreateChecklistItemDTO) => void,
  createComment: (createCommentDTO: CreateCommentDTO) => void,
  createTaskTag: (createTaskTagDTO: CreateTaskTagDTO) => void,
  deleteAttachment: (attachmentId: string) => void,
  deleteChecklistItem: (checklistItemIdToDelete: string) => void,
  deleteComment: (commentIdToDelete: string) => void,
  deleteTaskTag: (taskTagIdToDelete: string) => void,
  updateAttachment: (id: string, updateAttachmentDTO: UpdateAttachmentDTO) => void,
  updateChecklistItem: (id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => void,
  updateComment: (id: string, text: string) => void,
  updateStatus: (statusId: string, statusTypeId: string) => void,
  updateTask: (updateTaskDTO: UpdateTaskDTO) => void,
};

const TaskContext = createContext<undefined | TaskContextProps>(undefined);

interface TaskProviderProps {
  children: ReactElement,
  task: Task,
};

const TaskProvider: FC<TaskProviderProps> = ({ children, task: providedTask }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { updateTaskInTasks } = useTasks();

  const [newCommentId, setNewCommentId] = useState<undefined | string>();

  // Top-level task functionality
  const updateTask = useCallback((body: UpdateTaskDTO) => {
    TasksApi.update(providedTask.id, body, getAccessTokenSilently, updateTaskInTasks);
  }, [providedTask.id, getAccessTokenSilently, updateTaskInTasks]);

  // Task Attachment functionality
  const createAttachment = useCallback((body: CreateAttachmentDTO) => {
    TaskAttachmentsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const updateAttachment = useCallback((id: string, body: UpdateAttachmentDTO) => {
    TaskAttachmentsApi.update(id, body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const deleteAttachment = useCallback((id: string) => {
    TaskAttachmentsApi.deleteById(id, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask,  getAccessTokenSilently, updateTaskInTasks])

  // Status functionality
  const updateStatus = useCallback((id: string, statusTypeId: string) => {
    const body = { statusTypeId };
    StatusesApi.update( id, body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  // ChecklistItem functionality
  const createChecklistItem = useCallback((body: CreateChecklistItemDTO) => {
    ChecklistItemsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const updateChecklistItem = useCallback((id: string, body: UpdateChecklistItemDTO) => {
    ChecklistItemsApi.update(id, body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const deleteChecklistItem = useCallback((id: string) => {
    ChecklistItemsApi.deleteById(id, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  // Comment functionality
  const createComment = useCallback(async (body: CreateCommentDTO) => {
    const newTask = await CommentsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
    setNewCommentId(newTask.id);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const updateComment = useCallback((id: string, text: string) => {
    CommentsApi.update(id, text, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const deleteComment = useCallback((id: string) => {
    CommentsApi.deleteById(id, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  // Tag functionality
  const createTaskTag = useCallback((body: CreateTaskTagDTO) => {
    TaskTagsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const deleteTaskTag = useCallback((id: string) => {
    TaskTagsApi.deleteById(id, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const value = {
    ...providedTask,
    newCommentId,
    createAttachment,
    createChecklistItem,
    createComment,
    createTaskTag,
    deleteAttachment,
    deleteChecklistItem,
    deleteComment,
    deleteTaskTag,
    updateAttachment,
    updateChecklistItem,
    updateComment,
    updateStatus,
    updateTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask should only be used within the TaskProvider.');
  }
  return context;
};

export {
  TaskProvider,
  useTask,
};
