import { createContext } from 'react';

interface SearchTasksContextType {
  searchedTasks?: Task[],
  searchText: string,
  updateSearchText: (searchText: string) => void,
};

const SearchTasksContext = createContext<undefined | SearchTasksContextType>(undefined);

export default SearchTasksContext;
