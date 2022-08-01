import { createContext } from 'react';

interface AppContextType {
  isExpanded: boolean,
  user?: User,
  logout: () => void,
  toggleIsExpanded: () => void,
};

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
