import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import TasksProvider from 'providers/tasks/provider';
import GoalsPage from 'routes/goals';
import NotesPage from 'routes/notes';
import TasksPage from 'routes/tasks';
import { GOALS_ROUTE, NOTES_ROUTE, ROOT_ROUTE, TASKS_ROUTE } from 'settings';

const TMRouter: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate(ROOT_ROUTE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goalRoutes = {
    path: GOALS_ROUTE,
    element: <GoalsPage />,
    children: [],
  };

  const noteRoutes = {
    path: NOTES_ROUTE,
    element: <NotesPage />,
    children: [],
  };

  const taskRoutes = {
    path: TASKS_ROUTE,
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
}

export default TMRouter;
