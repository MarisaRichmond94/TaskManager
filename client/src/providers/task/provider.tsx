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
    if (updateTaskDTO.description) copy.description = updateTaskDTO.description;
    if (updateTaskDTO.dueDate) copy.dueDate = updateTaskDTO.dueDate;
    if (updateTaskDTO.isPinned !== undefined) copy.isPinned = updateTaskDTO.isPinned;
    if (updateTaskDTO.objective) copy.objective = updateTaskDTO.objective;
    updateTaskInTasks(copy);
    await TasksApi.update(copy.id, updateTaskDTO);
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
