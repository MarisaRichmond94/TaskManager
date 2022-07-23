import { ReactElement, useCallback } from 'react';

import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';
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
import { handleUpdateStatus } from 'providers/task/utils/status';
import { handleUpdateTask } from 'providers/task/utils/task';

interface TaskProps {
  children: ReactElement,
  task: Task,
};

const TaskProvider = ({ children, task: providedTask }: TaskProps) => {
  const { updateTaskInTasks } = useTasks();

  // Top-level task functionality
  const updateTask = useCallback((updateTaskDTO: UpdateTaskDTO) => {
    handleUpdateTask({ ...providedTask }, updateTaskDTO, updateTaskInTasks);
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

  const value = {
    ...providedTask,
    createChecklistItem,
    createComment,
    deleteChecklistItem,
    deleteComment,
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
