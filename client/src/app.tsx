import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useApp } from 'providers';
import { Header, Sidebar } from 'routes/components';
import Router from 'routes/Router';

const App: FC = () => {
  const { isExpanded } = useApp();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <TMLoader color='#99B83B' text='authenticating...' />;

  return (
    <div id='page' className={isExpanded ? '' : 'collapsed'}>
      <Header />
      <div id='content'>
        <Sidebar />
        <Router />
      </div>
    </div>
  );
};

export default App;
