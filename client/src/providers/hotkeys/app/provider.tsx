import { FC, KeyboardEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import useKeyStroke from 'hooks/useKeyStroke';
import { useApp } from 'providers/app';
import AppHotkeysContext from 'providers/hotkeys/app/context';
import { HOT_KEYS, ROUTES } from 'settings';

const {
  NAVIGATE_HOME,
  SHIFTED_1_KEY,
  SHIFTED_2_KEY,
  SHIFTED_3_KEY,
  TOGGLE_KEY,
} = HOT_KEYS;
const { GOALS_ROUTE, NOTES_ROUTE, ROOT_ROUTE, TASKS_ROUTE } = ROUTES;

interface IAppHotkeysProvider {
  children: ReactElement,
};

const AppHotkeysProvider: FC<IAppHotkeysProvider> = ({ children }) => {
  const { toggleIsExpanded } = useApp();
  const navigate = useNavigate();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case NAVIGATE_HOME: navigate(ROOT_ROUTE); break;
      case TOGGLE_KEY: toggleIsExpanded(); break;
      case SHIFTED_1_KEY: navigate(TASKS_ROUTE); break;
      case SHIFTED_2_KEY: navigate(NOTES_ROUTE); break;
      case SHIFTED_3_KEY: navigate(GOALS_ROUTE); break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: NAVIGATE_HOME },
      { shiftKey: true, key: TOGGLE_KEY },
      { shiftKey: true, key: SHIFTED_1_KEY },
      { shiftKey: true, key: SHIFTED_2_KEY },
      { shiftKey: true, key: SHIFTED_3_KEY },
    ],
    handleKeyStrokes,
  );

  const value = {};

  return (
    <AppHotkeysContext.Provider value={value}>
      {children}
    </AppHotkeysContext.Provider>
  );
};

export default AppHotkeysProvider;
