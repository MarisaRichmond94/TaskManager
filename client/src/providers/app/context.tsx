import { createContext } from 'react';

interface AppContextType {
  isExpanded: boolean,
  isLoggedIn: boolean,
  user?: User,
  toggleIsExpanded: () => void,
};

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
