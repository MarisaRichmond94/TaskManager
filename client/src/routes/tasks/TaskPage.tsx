import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { SearchTasksProvider, TasksHotkeysProvider, useSearchTasks, useTasks } from 'providers';
import { Header, SearchResults, Tasks, Workspace } from 'routes/tasks';
import { HEADER_HEIGHT, WORKSPACE_PANEL_HEIGHT } from 'settings';

const TaskPage: FC = () => {
  const { userTaskDataLoaded } = useTasks();

  return userTaskDataLoaded
    ? (
      <SearchTasksProvider>
        <TasksHotkeysProvider>
          <TaskPageContent />
        </TasksHotkeysProvider>
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

  const content = isShowingSearch
    ? <SearchResults height={height} />
    : <Tasks height={height} />

  return (
    <div id='task-page' className='contents'>
      <Header />
      {content}
      <Workspace />
    </div>
  );
};

export default TaskPage;
