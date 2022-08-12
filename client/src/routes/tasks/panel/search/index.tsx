import './index.scss';

import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useSearchTasks } from 'providers/search_tasks';
import TaskCard from 'routes/tasks/task';

interface ISearchPanel {
  height: string,
};

const SearchPanel: FC<ISearchPanel> = ({ height }) => {
  const { searchedTasks } = useSearchTasks();

  if (!searchedTasks) return <TMLoader color='#99B83B' text='searching tasks...' />;

  const emptyResults = (
    <div className='header-text empty-task-section'>
      <div className='empty-search-panel'>No tasks found</div>
    </div>
  );

  return (
    <div className='tm-panel' id='tasks-search-panel' style={{ height }}>
      {
        !searchedTasks.length
          ? emptyResults
          : searchedTasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)
      }
    </div>
  );
};

export default SearchPanel;
