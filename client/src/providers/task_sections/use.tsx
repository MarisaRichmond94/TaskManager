import { useContext } from 'react';

import SectionsContext from 'providers/task_sections/context';

const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error('useSections should only be used within the SectionsProvider.');
  }
  return context;
}

export default useSections;
