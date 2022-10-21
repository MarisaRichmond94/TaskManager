import { useAuth0 } from "@auth0/auth0-react";
import { FC, ReactElement, useCallback } from 'react';

import * as AttachmentsApi from 'api/task_attachments';
import * as ChecklistItemsApi from 'api/checklist_items';
import * as CommentsApi from 'api/comment';
import * as StatusesApi from 'api/statuses';
import * as TaskTagsApi from 'api/task_tags';
import * as TasksApi from 'api/tasks';
import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';

interface ITaskProvider {
  children: ReactElement,
  task: Task,
};

const TaskProvider: FC<ITaskProvider> = ({ children, task: providedTask }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { updateTaskInTasks } = useTasks();

  // Top-level task functionality
  const updateTask = useCallback((body: UpdateTaskDTO) => {
    TasksApi.update(providedTask.id, body, getAccessTokenSilently, updateTaskInTasks);
  }, [providedTask.id, getAccessTokenSilently, updateTaskInTasks]);

  // Attachment functionality
  const createAttachment = useCallback((body: CreateAttachmentDTO) => {
    AttachmentsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const updateAttachment = useCallback((id: string, body: UpdateAttachmentDTO) => {
    AttachmentsApi.update(id, body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
  }, [providedTask, getAccessTokenSilently, updateTaskInTasks]);

  const deleteAttachment = useCallback((id: string) => {
    AttachmentsApi.deleteById(id, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
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
  const createComment = useCallback((body: CreateCommentDTO) => {
    CommentsApi.create(body, getAccessTokenSilently, { ...providedTask }, updateTaskInTasks);
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

export default TaskProvider;
