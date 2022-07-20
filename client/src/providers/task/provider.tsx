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
  const [task, setTask] = useState(providedTask);

  const updateTask = async(updateTaskDTO: UpdateTaskDTO) => {
    const copy = { ...task };
    const updatedTask = await TasksApi.update(task.id, updateTaskDTO);
    if (updateTaskDTO.description) copy.description = updatedTask.description;
    if (updateTaskDTO.dueDate) copy.dueDate = updatedTask.dueDate;
    if (updateTaskDTO.isPinned !== undefined) copy.isPinned = updatedTask.isPinned;
    if (updateTaskDTO.objective) copy.objective = updatedTask.objective;
    setTask(copy);
  };

  const updateStatus = async (statusId: string, statusTypeId: string) => {
    const updatedTask = { ...task };
    updatedTask.status = await StatusesApi.update(statusId, { statusTypeId });
    setTask(updatedTask);
    updateTaskInTasks(updatedTask);
  };

  const value = {
    task,
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
