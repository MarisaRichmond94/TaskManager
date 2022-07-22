import { ReactElement, useCallback } from 'react';

import TaskContext from 'providers/task/context';
import { useTasks } from 'providers/tasks';
import { checklistItemUpdateHandler } from 'providers/task/utils/checklistItem';
import { statusUpdateHandler } from 'providers/task/utils/status';
import { taskUpdateHandler } from 'providers/task/utils/task';

interface TaskProps {
  children: ReactElement,
  task: Task,
};

const TaskProvider = ({ children, task: providedTask }: TaskProps) => {
  const { updateTaskInTasks } = useTasks();

  const updateTask = useCallback((updateTaskDTO: UpdateTaskDTO) => {
    taskUpdateHandler({ ...providedTask }, updateTaskDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateStatus = useCallback((statusId: string, statusTypeId: string) => {
    statusUpdateHandler({ ...providedTask }, statusId, statusTypeId, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const updateChecklistItem = useCallback((id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => {
    checklistItemUpdateHandler({ ...providedTask }, id, updateChecklistItemDTO, updateTaskInTasks);
  }, [providedTask, updateTaskInTasks]);

  const value = {
    ...providedTask,
    updateChecklistItem,
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
