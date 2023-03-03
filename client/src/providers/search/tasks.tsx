import { createContext, createRef, RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import * as filter from 'providers/utils/filter';
import { useTasks } from 'providers';
import { FilterAction, FilterType } from 'types/constants/search';

interface SearchTasksContextProps {
  isAsc: boolean,
  isFilterMenuOpen: boolean,
  isShowingSearch: boolean,
  searchInputRef: RefObject<HTMLInputElement>,
  searchedTasks?: Task[],
  clearUrlFilters: () => void,
  onFilterAction: (actionType: FilterAction, filterType: FilterType, filterValue?: any) => void,
  setIsFilterMenuOpen: (isFilterMenuOpen: boolean) => void,
  updateSearchText: (searchText: string) => void,
  updateSortOrder: (updatedSortOrder: boolean) => void,
};

const SearchTasksContext = createContext<undefined | SearchTasksContextProps>(undefined);

const SearchTasksProvider = (props: object) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { tasks, updateActiveTaskId } = useTasks();
  const searchInputRef = createRef<HTMLInputElement>();

  const [isAsc, setIsAsc] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();

  useEffect(() => { setSearchedTasks(filter.filter(tasks, search)) }, [search, tasks]);

  const updateSortOrder = useCallback((updatedSortOrder: boolean) => {
    setIsAsc(updatedSortOrder);
    const searchParams = new URLSearchParams(search);
    searchParams.set('asc', updatedSortOrder.toString());
    navigate({ search: searchParams.toString() });
  }, [navigate, search]);

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

  const clearUrlFilters = useCallback(() => { filter.clear(search, navigate); }, [navigate, search]);

  const updateSearchText = useCallback((updatedSearchText: string) => {
    filter.setSearchText(updatedSearchText, search, navigate);
    if (updatedSearchText !== '') updateActiveTaskId(undefined);
  }, [navigate, search, updateActiveTaskId]);

  const value = {
    isAsc,
    isFilterMenuOpen,
    isShowingSearch: !!search.includes('searchText') || !!search.includes('filters'),
    searchInputRef,
    searchedTasks,
    clearUrlFilters,
    onFilterAction,
    setIsFilterMenuOpen,
    updateSearchText,
    updateSortOrder,
  };

  return <SearchTasksContext.Provider value={value} {...props} />;
};

const useSearchTasks = () => {
  const context = useContext(SearchTasksContext);
  if (context === undefined) {
    throw new Error('useSearchTasks should only be used within the SearchTasksProvider.');
  }
  return context;
}

export {
  SearchTasksProvider,
  useSearchTasks,
};
