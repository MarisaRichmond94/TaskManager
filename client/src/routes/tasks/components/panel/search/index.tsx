import './index.scss';

import { ReactElement } from 'react';

import { useTasks } from 'providers/tasks';

export interface SearchPanelProps {
};

const SearchPanel = ({ }: SearchPanelProps): ReactElement => {
  const { searchedTasks } = useTasks();

  const results = <div className='empty-search-panel'>No tasks found</div>

  return (
    <div className='tm-panel' id='tasks-search-panel'>
      {results}
    </div>
  );
};

export default SearchPanel;
