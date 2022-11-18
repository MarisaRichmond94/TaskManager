import { createContext } from 'react';

interface IAppContext {
  isExpanded: boolean,
  isOverlayActive: boolean,
  user?: User,
  logout: () => void,
  toggleIsExpanded: () => void,
  toggleIsOverlayActive: () => void,
};

const AppContext = createContext<undefined | IAppContext>(undefined);

export default AppContext;
