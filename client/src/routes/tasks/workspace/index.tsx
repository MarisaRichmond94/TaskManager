import './index.scss';

import { FC } from 'react';

import { TaskHotkeysProvider, TaskProvider, useTasks } from 'providers';

import Body from 'routes/tasks/workspace/body';
import Header from 'routes/tasks/workspace/header';
import Sidebar from 'routes/tasks/workspace/sidebar';
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
            <Header />
            <div className='content'>
              <Body />
              <Sidebar />
            </div>
          </div>
        </TaskHotkeysProvider>
      </TaskProvider>
    </div>
  );
};

export default Workspace;
