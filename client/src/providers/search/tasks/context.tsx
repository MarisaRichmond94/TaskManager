import { createContext } from 'react';

import { FilterAction, FilterType } from 'types/constants';

interface ISearchTasksContext {
  isShowingSearch: boolean,
  searchedTasks?: Task[],
  clearUrlFilters: () => void,
  onFilterAction: (actionType: FilterAction, filterType: FilterType, filterValue?: any) => void,
  updateSearchText: (searchText: string) => void,
};

const SearchTasksContext = createContext<undefined | ISearchTasksContext>(undefined);

export default SearchTasksContext;
