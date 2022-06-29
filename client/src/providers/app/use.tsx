import { useContext } from 'react';

import AppContext from 'providers/app/context';

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp should only be used within the AppProvider.');
  }
  return context;
}

export default useApp;
