import { createContext } from 'react';

interface ITaskHotkeysContext {
};

const TaskHotkeysContext = createContext<undefined | ITaskHotkeysContext>(undefined);

export default TaskHotkeysContext;
