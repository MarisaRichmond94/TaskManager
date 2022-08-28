import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import SectionsHotkeysContext from 'providers/hotkeys/task_sections/context';

interface ISectionsHotkeysProvider {
  children: ReactElement,
};

const SectionsHotkeysProvider: FC<ISectionsHotkeysProvider> = ({ children }) => {
  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
    }
  };

  useKeyStroke(
    [
    ],
    handleKeyStrokes,
  );

  const value = {};

  return (
    <SectionsHotkeysContext.Provider value={value}>
      {children}
    </SectionsHotkeysContext.Provider>
  );
};

export default SectionsHotkeysProvider;
