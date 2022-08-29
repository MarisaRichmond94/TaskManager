import './index.scss';

import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useSearchTasks } from 'providers/search/tasks';
import TaskCard from 'routes/tasks/task';

interface ISearchResults {
  height: string,
};

const SearchResults: FC<ISearchResults> = ({ height }) => {
  const { searchedTasks } = useSearchTasks();

  if (!searchedTasks) return <TMLoader color='#99B83B' text='searching tasks...' />;

  const emptyResults = (
    <div className='header-text empty-tasks'>
      <div className='empty-search-results'>No tasks found</div>
    </div>
  );

  return (
    <div className='tm-panel' id='tasks-search-results' style={{ height }}>
      {
        !searchedTasks.length
          ? emptyResults
          : searchedTasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)
      }
    </div>
  );
};

export default SearchResults;
