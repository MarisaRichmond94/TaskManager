import { useContext } from 'react';

import SectionHotkeysContext from 'providers/hotkeys/task_section/context';

const useSectionHotkeys = () => {
  const context = useContext(SectionHotkeysContext);
  if (context === undefined) {
    throw new Error('useSectionHotkeys should only be used within the SectionHotkeysProvider.');
  }
  return context;
}

export default useSectionHotkeys;
