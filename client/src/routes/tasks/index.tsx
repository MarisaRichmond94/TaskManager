import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { TaskHotkeysProvider } from 'providers/hotkeys/tasks';
import { SearchTasksProvider, useSearchTasks } from 'providers/search/tasks';
import { useTasks } from 'providers/tasks';
import Header from 'routes/tasks/header';
import SearchPanel from 'routes/tasks/panel/search';
import TasksPanel from 'routes/tasks/panel/tasks';
import WorkspacePanel from 'routes/tasks/panel/workspace';
import { HEADER_HEIGHT, WORKSPACE_PANEL_HEIGHT } from 'settings';

const TaskPage: FC = (): JSX.Element => {
  const { userTaskDataLoaded } = useTasks();

  return userTaskDataLoaded
    ? (
      <SearchTasksProvider>
        <TaskHotkeysProvider>
          <TaskPageContent />
        </TaskHotkeysProvider>
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
