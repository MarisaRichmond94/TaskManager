import './index.scss';

import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';
import { buildSections } from 'routes/tasks/panel/tasks/section/buildSections';

interface ITasksPanel {
  height: string,
};

const TasksPanel: FC<ITasksPanel> = ({ height }) => {
  const { isShowingArchivedTasks, taskMap } = useTasks();

  return (
    taskMap
      ? (
        <div className='tm-panel' id='tasks-panel' style={{ height }}>
          {buildSections(taskMap, isShowingArchivedTasks)}
        </div>
      )
      : <TMLoader color='#99B83B' text='categorizing tasks...' />
  );
};

export default TasksPanel;
