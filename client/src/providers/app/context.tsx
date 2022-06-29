import { createContext } from 'react';

interface AppContextType {
  isLoggedIn: boolean,
  user?: User,
};

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
