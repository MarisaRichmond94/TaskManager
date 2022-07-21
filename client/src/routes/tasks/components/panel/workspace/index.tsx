import './index.scss';

import { ReactElement } from 'react';

import { TaskProvider } from 'providers/task';
import { useTasks } from 'providers/tasks';
import EditTaskCard from '../../task/edit';

const WorkspacePanel = (): ReactElement => {
  const { activeTaskId, tasks } = useTasks();

  if (!activeTaskId) return null;
  const activeTask = tasks.find(x => x.id === activeTaskId);

  return (
    <div className='tm-panel' id='task-workspace-panel'>
      <TaskProvider task={activeTask}>
        <EditTaskCard />
      </TaskProvider>
    </div>
  );
};

export default WorkspacePanel;
