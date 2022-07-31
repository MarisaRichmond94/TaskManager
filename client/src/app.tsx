import { useCallback, useEffect } from 'react';

import TMLoader from 'components/tm_loader';
import { useApp } from 'providers/app';
import TMRouter from 'routes/tm_router';
import TMHeader from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: React.FC = (): JSX.Element => {
  const { isExpanded, isLoggedIn } = useApp();

  const handleKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return isLoggedIn
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
    : <TMLoader color='#99B83B' text='authenticating...' />;
};

export default App;
