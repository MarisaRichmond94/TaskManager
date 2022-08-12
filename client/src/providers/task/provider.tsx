import { FC, ReactElement, useCallback } from 'react';

import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';
import { handleCreateAttachment, handleUpdateAttachment } from 'providers/task/utils/attachment';
import {
  handleCreateChecklistItem,
  handleUpdateChecklistItem,
  handleDeleteChecklistItem,
} from 'providers/task/utils/checklistItem';
import {
  handleCreateComment,
  handleUpdateComment,
  handleDeleteComment,
} from 'providers/task/utils/comment';
import {
  handleCreateTaskTag,
  handleDeleteTaskTag,
} from 'providers/task/utils/taskTag';
import { handleUpdateStatus } from 'providers/task/utils/status';
import { handleUpdateTask } from 'providers/task/utils/task';

interface ITaskProvider {
  children: ReactElement,
  task: Task,
};

const TaskProvider: FC<ITaskProvider> = ({ children, task: providedTask }) => {
  const { updateTaskInTasks } = useTasks();

  // Top-level task functionality
  const updateTask = useCallback((updateTaskDTO: UpdateTaskDTO) => {
    handleUpdateTask(providedTask.id, updateTaskDTO, updateTaskInTasks);
  }, [providedTask.id, updateTaskInTasks]);

  // Attachment functionality
  const createAttachment = useCallback((createAttachmentDTO: CreateAttachmentDTO) => {
    handleCreateAttachment({ ...providedTask }, createAttachmentDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateAttachment = useCallback((id: string, updateAttachmentDTO: UpdateAttachmentDTO) => {
    handleUpdateAttachment({ ...providedTask }, id, updateAttachmentDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  // Status functionality
  const updateStatus = useCallback((statusId: string, statusTypeId: string) => {
    handleUpdateStatus({ ...providedTask }, statusId, statusTypeId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  // ChecklistItem functionality
  const createChecklistItem = useCallback((createChecklistItemDTO: CreateChecklistItemDTO) => {
    handleCreateChecklistItem({ ...providedTask }, createChecklistItemDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateChecklistItem = useCallback((id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => {
    handleUpdateChecklistItem({ ...providedTask }, id, updateChecklistItemDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const deleteChecklistItem = useCallback((checklistItemId: string) => {
    handleDeleteChecklistItem({ ...providedTask }, checklistItemId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  // Comment functionality
  const createComment = useCallback((createCommentDTO: CreateCommentDTO) => {
    handleCreateComment({ ...providedTask }, createCommentDTO, updateTaskInTasks)
  }, [providedTask, updateTaskInTasks]);

  const updateComment = useCallback((id: string, updatedCommentText: string) => {
    handleUpdateComment({ ...providedTask }, id, updatedCommentText, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const deleteComment = useCallback((commentId: string) => {
    handleDeleteComment({ ...providedTask }, commentId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  // Tag functionality
  const createTaskTag = useCallback((createTaskTagDTO: CreateTaskTagDTO) => {
    handleCreateTaskTag({ ...providedTask }, createTaskTagDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const deleteTaskTag = useCallback((taskTagId: string) => {
    handleDeleteTaskTag({ ...providedTask }, taskTagId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const value = {
    ...providedTask,
    createAttachment,
    createChecklistItem,
    createComment,
    createTaskTag,
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
