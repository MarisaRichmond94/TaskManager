import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import SearchTasksContext from 'providers/search/tasks/context';
import * as filter from 'providers/search/tasks/utils/filter';
import { useTasks } from 'providers/tasks';
import { FilterAction, FilterType } from 'types/constants';

const SearchTasksProvider = (props: object) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { tasks, updateActiveTaskId } = useTasks();
  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();

  useEffect(() => { setSearchedTasks(filter.filter(tasks, search)) }, [search, tasks]);

  const updateUrlFilter = useCallback((filterType: FilterType, filterValue: any): void => {
    filter.update(filterType, filterValue, search, navigate, filterType === FilterType.tags);
    const filteredTasks = filter.filter(tasks, search);
    setSearchedTasks(filteredTasks);
  }, [navigate, tasks, search]);

  const removeUrlFilter = useCallback((filterType: FilterType, filterValue: any): void => {
    if (filterType) {
      filter.remove(filterType, search, navigate, filterValue);
      const filteredTasks = filter.filter(tasks, search);
      setSearchedTasks(filteredTasks);
    }
  }, [navigate, tasks, search]);

  const onFilterAction = useCallback((
    actionType: FilterAction,
    filterType: FilterType,
    filterValue?: any,
  ): void => {
    switch (actionType) {
      case FilterAction.update:
        updateUrlFilter(filterType, filterValue);
        break;
      case FilterAction.remove:
        removeUrlFilter(filterType, filterValue);
        break;
    }
  }, [updateUrlFilter, removeUrlFilter]);

  const clearUrlFilters = () => { filter.clear(search, navigate); };

  const updateSearchText = useCallback((updatedSearchText: string) => {
    filter.setSearchText(updatedSearchText, search, navigate);
    if (updatedSearchText !== '') updateActiveTaskId(undefined);
  }, [navigate, search, updateActiveTaskId]);

  const value = {
    isShowingSearch: !!search.includes('searchText') || !!search.includes('filters'),
    searchedTasks,
    clearUrlFilters,
    onFilterAction,
    updateSearchText,
  };

  return <SearchTasksContext.Provider value={value} {...props} />;
};

export default SearchTasksProvider;
