import { createContext } from 'react';

interface IAppHotkeysContext {
};

const AppHotkeysContext = createContext<undefined | IAppHotkeysContext>(undefined);

export default AppHotkeysContext;
