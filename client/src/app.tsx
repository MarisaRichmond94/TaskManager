import TMLoader from 'components/tm_loader';
import { useApp } from 'providers/app';
import TMRouter from 'routes/tm_router';
import TMHeader from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: React.FC = (): JSX.Element => {
  const { isLoggedIn } = useApp();

  return isLoggedIn
    ? (
      <>
        <div id='page-container'>
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
