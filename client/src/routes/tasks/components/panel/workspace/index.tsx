import './index.scss';

import { ReactElement, useEffect } from 'react';

import { TaskProvider } from 'providers/task';
import { useTasks } from 'providers/tasks';
import EditTaskCard from '../../task/edit';

const WorkspacePanel = (): ReactElement => {
  const { activeTask } = useTasks();

  if (!activeTask) return null;

  return (
    <div className='tm-panel' id='task-workspace-panel'>
      <TaskProvider task={activeTask}>
        <EditTaskCard task={activeTask} />
      </TaskProvider>
    </div>
  );
};

export default WorkspacePanel;
