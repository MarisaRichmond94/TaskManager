import { FC, KeyboardEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import useKeyStroke from 'hooks/useKeyStroke';
import { useApp } from 'providers/app';
import AppHotkeysContext from 'providers/hotkeys/app/context';
import { SHIFT_KEY_STROKES } from 'settings/hotkeys';
import { ROUTES } from 'settings/routes';

const { app: appKeys } = SHIFT_KEY_STROKES;

interface IAppHotkeysProvider {
  children: ReactElement,
};

const AppHotkeysProvider: FC<IAppHotkeysProvider> = ({ children }) => {
  const { toggleIsExpanded } = useApp();
  const navigate = useNavigate();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case appKeys.navigateHome: navigate(ROUTES.rootRoute); break;
      case appKeys.toggleSidebar: toggleIsExpanded(); break;
      case appKeys.navigateTasks: navigate(ROUTES.tasksRoute); break;
      case appKeys.navigateNotes: navigate(ROUTES.notesRoute); break;
      case appKeys.navigateGoals: navigate(ROUTES.goalsRoute); break;
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: appKeys.navigateHome },
      { shiftKey: true, key: appKeys.toggleSidebar },
      { shiftKey: true, key: appKeys.navigateTasks },
      { shiftKey: true, key: appKeys.navigateNotes },
      { shiftKey: true, key: appKeys.navigateGoals },
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
