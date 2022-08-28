import { FC, KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import SectionHotkeysContext from 'providers/hotkeys/task_section/context';

interface ISectionHotkeysProvider {
  children: ReactElement,
};

const SectionHotkeysProvider: FC<ISectionHotkeysProvider> = ({ children }) => {
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
    <SectionHotkeysContext.Provider value={value}>
      {children}
    </SectionHotkeysContext.Provider>
  );
};

export default SectionHotkeysProvider;
