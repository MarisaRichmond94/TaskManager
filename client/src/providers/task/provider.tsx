import { ReactElement, useCallback } from 'react';

import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';
import { handleUpdateChecklistItem } from 'providers/task/utils/checklistItem';
import { handleUpdateComment } from 'providers/task/utils/comment';
import { handleUpdateStatus } from 'providers/task/utils/status';
import { handleUpdateTask } from 'providers/task/utils/task';

interface TaskProps {
  children: ReactElement,
  task: Task,
};

const TaskProvider = ({ children, task: providedTask }: TaskProps) => {
  const { updateTaskInTasks } = useTasks();

  const updateTask = useCallback((updateTaskDTO: UpdateTaskDTO) => {
    handleUpdateTask({ ...providedTask }, updateTaskDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateStatus = useCallback((statusId: string, statusTypeId: string) => {
    handleUpdateStatus({ ...providedTask }, statusId, statusTypeId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateChecklistItem = useCallback((id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => {
    handleUpdateChecklistItem({ ...providedTask }, id, updateChecklistItemDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateComment = useCallback((id: string, updatedCommentText: string) => {
    handleUpdateComment({ ...providedTask }, id, updatedCommentText, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const value = {
    ...providedTask,
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
