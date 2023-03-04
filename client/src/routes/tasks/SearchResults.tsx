import './SearchResults.scss';

import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useSearchTasks } from 'providers';
import { TaskCard } from 'routes/tasks';

interface SearchResultsProps {
  height: string,
};

const SearchResults: FC<SearchResultsProps> = ({ height }) => {
  const { searchedTasks } = useSearchTasks();

  if (!searchedTasks) {
    return <TMLoader color='#99B83B' text='searching tasks...' />;
  }

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
