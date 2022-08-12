import { useContext } from 'react';

import SearchTasksContext from 'providers/search/tasks/context';

const useSearchTasks = () => {
  const context = useContext(SearchTasksContext);
  if (context === undefined) {
    throw new Error('useSearchTasks should only be used within the SearchTasksProvider.');
  }
  return context;
}

export default useSearchTasks;
