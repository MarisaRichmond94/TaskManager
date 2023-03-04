import './Workspace.scss';

import { FC } from 'react';

import { TaskHotkeysProvider, TaskProvider, useTasks } from 'providers';

import { WorkspaceBody, WorkspaceHeader, WorkspaceSidebar } from 'routes/tasks';
import { WORKSPACE_PANEL_HEIGHT } from 'settings';

const Workspace: FC = () => {
  const { activeTaskId, tasks } = useTasks();

  if (!activeTaskId) return null;
  const activeTask = tasks.find(x => x.id === activeTaskId);

  return (
    <div className='tm-panel' style={{ height: `${WORKSPACE_PANEL_HEIGHT - 5}px` }}>
      <TaskProvider task={{...activeTask}}>
        <TaskHotkeysProvider>
          <div id='workspace'>
            <WorkspaceHeader />
            <div className='content'>
              <WorkspaceBody />
              <WorkspaceSidebar />
            </div>
          </div>
        </TaskHotkeysProvider>
      </TaskProvider>
    </div>
  );
};

export default Workspace;
