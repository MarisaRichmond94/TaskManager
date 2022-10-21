import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { useApp } from 'providers/app';
import TMRouter from 'routes/tm_router';
import Header from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: FC = () => {
  const { isExpanded } = useApp();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <TMLoader color='#99B83B' text='authenticating...' />;

  return (
    <div id='page' className={isExpanded ? '' : 'collapsed'}>
      <Header />
      <div id='content'>
        <TMSidebar />
        <TMRouter />
      </div>
    </div>
  );
};

export default App;
