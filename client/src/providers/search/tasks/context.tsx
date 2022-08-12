import { createContext, RefObject } from 'react';

import { FilterAction, FilterType } from 'types/constants';

interface ISearchTasksContext {
  isAsc: boolean,
  isShowingSearch: boolean,
  searchInputRef: RefObject<HTMLInputElement>,
  searchedTasks?: Task[],
  clearUrlFilters: () => void,
  onFilterAction: (actionType: FilterAction, filterType: FilterType, filterValue?: any) => void,
  updateSearchText: (searchText: string) => void,
  updateSortOrder: (updatedSortOrder: boolean) => void,
};

const SearchTasksContext = createContext<undefined | ISearchTasksContext>(undefined);

export default SearchTasksContext;
