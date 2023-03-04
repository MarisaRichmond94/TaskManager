import { FC, useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import { TasksProvider } from 'providers';
import { GoalsPage, NotesPage, TasksPage } from 'routes';
import { ROUTES } from 'settings';

const goalRoutes = {
  path: ROUTES.goalsRoute,
  element: <GoalsPage />,
  children: [],
};

const noteRoutes = {
  path: ROUTES.notesRoute,
  element: <NotesPage />,
  children: [],
};

const taskRoutes = {
  path: ROUTES.tasksRoute,
  element: (
    <TasksProvider>
      <TasksPage />
    </TasksProvider>
  ),
  children: [],
};

const Router: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== ROUTES.rootRoute) {
      return navigate(ROUTES.rootRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routing = useRoutes([goalRoutes, noteRoutes, taskRoutes]);

  return (
    <div id='content-container'>
      {routing}
    </div>
  );
};

export default Router;
