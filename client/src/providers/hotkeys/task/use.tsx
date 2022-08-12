import { useContext } from 'react';

import TaskHotkeysContext from 'providers/hotkeys/task/context';

const useTaskHotkeys = () => {
  const context = useContext(TaskHotkeysContext);
  if (context === undefined) {
    throw new Error('useTaskHotkeys should only be used within the TaskHotkeysProvider.');
  }
  return context;
}

export default useTaskHotkeys;
