import { useRoutes } from 'react-router-dom';

import GoalsPage from 'routes/goals';
import HomePage from 'routes/home';
import NotesPage from 'routes/notes';
import TasksPage from 'routes/tasks';
import { GOALS_ROUTE, NOTES_ROUTE, ROOT_ROUTE, TASKS_ROUTE } from 'settings';

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: ROOT_ROUTE,
    element: <HomePage />,
    children: [],
  };

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
    element: <TasksPage />,
    children: [],
  };

  const routing = useRoutes([mainRoutes, goalRoutes, noteRoutes, taskRoutes]);
  return <>{routing}</>;
}

export default App;
