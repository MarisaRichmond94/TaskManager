import { useContext } from 'react';

import AppHotkeysContext from 'providers/hotkeys/app/context';

const useAppHotkeys = () => {
  const context = useContext(AppHotkeysContext);
  if (context === undefined) {
    throw new Error('useAppHotkeys should only be used within the AppHotkeysProvider.');
  }
  return context;
}

export default useAppHotkeys;
