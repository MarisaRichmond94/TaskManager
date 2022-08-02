import './index.scss';

import { ReactElement } from 'react';

import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';
import { buildSections } from 'routes/tasks/components/panel/tasks/section/buildSections';
import { HEADER_HEIGHT, WORKSPACE_PANEL_HEIGHT } from 'settings';

const TasksPanel = (): ReactElement => {
  const { activeTaskId, isShowingArchivedTasks, taskMap } = useTasks();

  const height = (
    activeTaskId
      ? `calc(100% - ${(HEADER_HEIGHT + WORKSPACE_PANEL_HEIGHT)}px)`
      : `calc(100% - ${HEADER_HEIGHT}px)`
  );

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
