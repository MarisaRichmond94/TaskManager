import { createContext } from 'react';

interface TaskContextType {
  task: Task,
  updateStatus: (statusId: string, statusTypeId: string) => void,
  updateTask: (updateTaskDTO: UpdateTaskDTO) => void,
};

const TaskContext = createContext<undefined | TaskContextType>(undefined);

export default TaskContext;
