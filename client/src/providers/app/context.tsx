import { createContext } from 'react';

interface IAppContext {
  isExpanded: boolean,
  user?: User,
  logout: () => void,
  toggleIsExpanded: () => void,
};

const AppContext = createContext<undefined | IAppContext>(undefined);

export default AppContext;
