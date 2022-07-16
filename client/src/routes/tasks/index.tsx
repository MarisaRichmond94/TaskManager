import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import TMLoader from 'components/tm_loader';
import useQuery from 'hooks/useQuery';
import { useTasks } from 'providers/tasks';
import Header from 'routes/tasks/components/header';
import SearchPanel from 'routes/tasks/components/panel/search';
import TasksPanel from 'routes/tasks/components/panel/tasks';

const TaskPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = useQuery(search);

  const [searchText, setSearchText] = useState(query.get('searchText') || '');
  const [debounceUpdateSearch] = useState(
    () => debounce(
      250, false, (text: string): void => {
        const searchParams = new URLSearchParams();
        if (text !== '') searchParams.set('searchText', text);
        navigate({ search: searchParams.toString() });
      }
    ),
  );

  const { userTaskDataLoaded } = useTasks();

  const updateSearchText = (updatedSearchText: string) => {
    setSearchText(updatedSearchText);
    debounceUpdateSearch(updatedSearchText);
  };

  return userTaskDataLoaded
    ? (
      <div id='task-page' className='contents'>
        <Header searchText={searchText} updateSearchText={updateSearchText} />
        {searchText ? <SearchPanel /> : <TasksPanel />}
      </div>
    )
    : <TMLoader color='#99B83B' text='fetching tasks...' />;
};

export default TaskPage;
