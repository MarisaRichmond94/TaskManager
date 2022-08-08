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

  // Search state
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
  // Filter state
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>();
  const [includeArchived, setIncludeArchived] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>();
  const [statusFilter, setStatusFilter] = useState<Status | undefined>();
  const [tagFilters, setTagFilters] = useState([]);

  const updateSearchText = useCallback((updatedSearchText: string) => {
    setSearchText(updatedSearchText);
    debounceUpdateSearch(updatedSearchText);
    if (searchText === '' && updatedSearchText !== '') updateActiveTaskId(undefined);
  }, [debounceUpdateSearch, searchText, updateActiveTaskId]);

  const updateSearchTasks = useCallback(() =>
    setSearchedTasks(
      tasks.filter(x =>
        x.objective &&
        x.objective.toLowerCase().includes(searchText.toLowerCase())
      )
    ),
    [searchText, tasks],
  );

  useEffect(() => {
    if (searchText !== '') updateSearchTasks();
  }, [searchText, tasks, updateSearchTasks]);
  useEffect(() => { updateSearchTasks(); }, [searchText, updateSearchTasks]);

  const addTagFilter = useCallback((tagId: string) => {
    setTagFilters([...tagFilters, tagId])
  }, [tagFilters]);

  const removeTagFilter = useCallback((tagId: string) => {
    setTagFilters(tagFilters?.filter(tagFilter => tagFilter !== tagId));
  }, [tagFilters]);

  const clearFilters = useCallback(() => {
    setStatusFilter(undefined);
    setStartDateFilter(undefined);
    setEndDateFilter(undefined);
    setTagFilters([]);
  }, []);

  const value = {
    // search values
    searchedTasks,
    searchText,
    updateSearchText,
    // filter values
    endDateFilter,
    includeArchived,
    startDateFilter,
    statusFilter,
    tagFilters,
    addTagFilter,
    clearFilters,
    removeTagFilter,
    setEndDateFilter,
    setIncludeArchived,
    setStartDateFilter,
    setStatusFilter,
  };

  return <SearchTasksContext.Provider value={value} {...props} />;
};

export default SearchTasksProvider;
