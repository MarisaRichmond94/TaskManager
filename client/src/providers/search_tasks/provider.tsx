import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import useQuery from 'hooks/useQuery';
import SearchTasksContext from 'providers/search_tasks/context';
import { useTasks } from 'providers/tasks';

const SearchTasksProvider = (props: object) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = useQuery(search);
  const { tasks, updateActiveTaskId } = useTasks();

  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();
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

  const updateSearchText = useCallback((updatedSearchText: string) => {
    setSearchText(updatedSearchText);
    debounceUpdateSearch(updatedSearchText);
    if (searchText === '' && updatedSearchText !== '') updateActiveTaskId(undefined);
  }, [debounceUpdateSearch, searchText, updateActiveTaskId]);

  const updateSearchTasks = useCallback(() =>
    setSearchedTasks(
      tasks.filter(x => x.objective.toLowerCase().includes(searchText.toLowerCase()))
    ),
    [searchText, tasks],
  );

  useEffect(() => {
    if (searchText !== '') updateSearchTasks();
  }, [searchText, tasks, updateSearchTasks]);
  useEffect(() => { updateSearchTasks(); }, [searchText, updateSearchTasks]);

  const value = {
    searchedTasks,
    searchText,
    updateSearchText,
  };

  return <SearchTasksContext.Provider value={value} {...props} />;
};

export default SearchTasksProvider;
