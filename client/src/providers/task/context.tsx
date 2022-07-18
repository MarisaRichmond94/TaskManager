import { createContext } from 'react';

interface TaskContextType {
  task: Task,
  archiveTask: () => void,
  deleteTask: () => void,
  updateStatus: (statusId: string, statusTypeId: string) => void,
  updateTask: (updateTaskDTO: UpdateTaskDTO) => void,
};

const TaskContext = createContext<undefined | TaskContextType>(undefined);

export default TaskContext;
