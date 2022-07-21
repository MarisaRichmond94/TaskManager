import { ReactElement, useState } from 'react';

import StatusesApi from 'api/statuses';
import TasksApi from 'api/tasks';
import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';

interface TaskProps {
  children: ReactElement,
  task: Task,
};

const TaskProvider = ({ children, task: providedTask }: TaskProps) => {
  const { updateTaskInTasks } = useTasks();

  const updateTask = async(updateTaskDTO: UpdateTaskDTO) => {
    const copy = { ...providedTask };
    const updatedTask = await TasksApi.update(copy.id, updateTaskDTO);
    if (updateTaskDTO.description) copy.description = updatedTask.description;
    if (updateTaskDTO.dueDate) copy.dueDate = updatedTask.dueDate;
    if (updateTaskDTO.isPinned !== undefined) copy.isPinned = updatedTask.isPinned;
    if (updateTaskDTO.objective) copy.objective = updatedTask.objective;
    updateTaskInTasks(copy);
  };

  const updateStatus = async (statusId: string, statusTypeId: string) => {
    const updatedTask = { ...providedTask };
    updatedTask.status = await StatusesApi.update(statusId, { statusTypeId });
    updateTaskInTasks(updatedTask);
  };

  const value = {
    ...providedTask,
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
