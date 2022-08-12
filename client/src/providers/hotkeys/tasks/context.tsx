import { createContext } from 'react';

interface ITasksHotkeysContext {
};

const TasksHotkeysContext = createContext<undefined | ITasksHotkeysContext>(undefined);

export default TasksHotkeysContext;
