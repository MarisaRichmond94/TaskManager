import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { SearchTasksProvider, useSearchTasks } from 'providers/search_tasks';
import { useTasks } from 'providers/tasks';
import Header from 'routes/tasks/components/header';
import SearchPanel from 'routes/tasks/components/panel/search';
import TasksPanel from 'routes/tasks/components/panel/tasks';
import WorkspacePanel from 'routes/tasks/components/panel/workspace';

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
  const { isShowingSearch } = useSearchTasks();

  return (
    <div id='task-page' className='contents'>
      <Header />
      {isShowingSearch ? <SearchPanel /> : <TasksPanel />}
      <WorkspacePanel />
    </div>
  );
};

export default TaskPage;
