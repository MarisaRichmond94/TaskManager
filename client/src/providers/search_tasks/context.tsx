import { createContext } from 'react';

interface SearchTasksContextType {
  // Search context
  searchedTasks?: Task[],
  searchText: string,
  updateSearchText: (searchText: string) => void,
  // Filter context
  endDateFilter?: Date,
  includeArchived: boolean,
  startDateFilter?: Date,
  statusFilter?: Status,
  tagFilters: string[],
  addTagFilter: (tagId: string) => void,
  clearFilters: () => void,
  removeTagFilter: (tagId: string) => void,
  setEndDateFilter: (endDateFilter?: Date) => void,
  setIncludeArchived: (includeArchived: boolean) => void,
  setStartDateFilter: (startDateFilter?: Date) => void,
  setStatusFilter?: (statusFilter?: Status) => void,
};

const SearchTasksContext = createContext<undefined | SearchTasksContextType>(undefined);

export default SearchTasksContext;
