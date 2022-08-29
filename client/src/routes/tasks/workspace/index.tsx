import './index.scss';

import { FC } from 'react';

import { TaskProvider } from 'providers/task';
import { TaskHotkeysProvider } from 'providers/hotkeys/task';
import { useTasks } from 'providers/tasks';

import Body from 'routes/tasks/workspace/body';
import Header from 'routes/tasks/workspace/header';
import Sidebar from 'routes/tasks/workspace/sidebar';

const Workspace: FC = () => {
  const { activeTaskId, tasks } = useTasks();

  if (!activeTaskId) return null;
  const activeTask = tasks.find(x => x.id === activeTaskId);

  return (
    <div className='tm-panel'>
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
