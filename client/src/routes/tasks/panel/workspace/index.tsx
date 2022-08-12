import './index.scss';

import { ReactElement } from 'react';

import { TaskProvider } from 'providers/task';
import { TaskHotkeysProvider } from 'providers/hotkeys/task';
import { useTasks } from 'providers/tasks';
import EditTaskCard from 'routes/tasks/task/edit';

const WorkspacePanel = (): ReactElement => {
  const { activeTaskId, tasks } = useTasks();

  if (!activeTaskId) return null;
  const activeTask = tasks.find(x => x.id === activeTaskId);

  return (
    <div className='tm-panel' id='task-workspace-panel'>
      <TaskProvider task={{...activeTask}}>
        <TaskHotkeysProvider>
          <EditTaskCard />
        </TaskHotkeysProvider>
      </TaskProvider>
    </div>
  );
};

export default WorkspacePanel;
