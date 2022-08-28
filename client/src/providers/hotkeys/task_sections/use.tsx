import { useContext } from 'react';

import SectionsHotkeysContext from 'providers/hotkeys/task_sections/context';

const useSectionsHotkeys = () => {
  const context = useContext(SectionsHotkeysContext);
  if (context === undefined) {
    throw new Error('useSectionsHotkeys should only be used within the SectionsHotkeysProvider.');
  }
  return context;
}

export default useSectionsHotkeys;
