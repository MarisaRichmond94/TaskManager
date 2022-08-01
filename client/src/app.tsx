import { useAuth0 } from "@auth0/auth0-react";

import TMLoader from 'components/tm_loader';
import { useApp } from 'providers/app';
import TMRouter from 'routes/tm_router';
import TMHeader from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: React.FC = (): JSX.Element => {
  const { isExpanded } = useApp();
  const { isAuthenticated } = useAuth0();

  return isAuthenticated
    ? (
      <>
        <div id='page-container' className={isExpanded ? 'expanded-app' : 'collapsed-app'}>
          <TMHeader />
          <div id='body-container'>
            <TMSidebar />
            <TMRouter />
          </div>
        </div>
      </>
    )
    : <TMLoader color='#99B83B' text='authenticating...' />
};

export default App;
