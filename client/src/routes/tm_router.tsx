import { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import TasksProvider from 'providers/tasks/provider';
import GoalsPage from 'routes/goals';
import NotesPage from 'routes/notes';
import TasksPage from 'routes/tasks';
import { ROUTES } from 'settings/routes';

const TMRouter: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== ROUTES.rootRoute) return navigate(ROUTES.rootRoute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const routing = useRoutes([goalRoutes, noteRoutes, taskRoutes]);
  return (
    <div id='content-container'>
      {routing}
    </div>
  );
};

export default TMRouter;
