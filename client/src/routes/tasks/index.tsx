import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { SearchTasksProvider, useSearchTasks } from 'providers/search_tasks';
import { useTasks } from 'providers/tasks';
import Header from 'routes/tasks/components/header';
import SearchPanel from 'routes/tasks/components/panel/search';
import TasksPanel from 'routes/tasks/components/panel/tasks';
import WorkspacePanel from 'routes/tasks/components/panel/workspace';
import { HEADER_HEIGHT, WORKSPACE_PANEL_HEIGHT } from 'settings';

const TaskPage: FC = (): JSX.Element => {
  const { userTaskDataLoaded } = useTasks();

  return userTaskDataLoaded
    ? (
      <SearchTasksProvider>
        <TaskPageContent />
      </SearchTasksProvider>
    )
    : <TMLoader color='#99B83B' text='fetching tasks...' />;
};

const TaskPageContent: FC = () => {
  const { activeTaskId } = useTasks();
  const { isShowingSearch } = useSearchTasks();
  const height = (
    activeTaskId
      ? `calc(100% - ${(HEADER_HEIGHT + WORKSPACE_PANEL_HEIGHT)}px)`
      : `calc(100% - ${HEADER_HEIGHT}px)`
  );

  return (
    <div id='task-page' className='contents'>
      <Header />
      {isShowingSearch ? <SearchPanel height={height} /> : <TasksPanel height={height} />}
      <WorkspacePanel />
    </div>
  );
};

export default TaskPage;
