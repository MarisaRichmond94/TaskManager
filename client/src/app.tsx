import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import TMLoader from 'components/tm_loader';
import TMRouter from 'routes/tm_router';
import TMHeader from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: React.FC = (): JSX.Element => {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // TODO - setup authentication

  return isAuthenticating
    ? <TMLoader color='#99B83B' text='authenticating...' />
    : (
      <>
        <div id='page-container'>
          <BrowserRouter>
            <TMHeader />
            <div id='body-container'>
              <TMSidebar />
              <TMRouter />
            </div>
          </BrowserRouter>
        </div>
      </>
    )
}

export default App;
