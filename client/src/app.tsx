import TMLoader from 'components/tm_loader';
import { useApp } from 'providers/app';
import TMRouter from 'routes/tm_router';
import TMHeader from 'routes/components/header';
import TMSidebar from 'routes/components/sidebar';

const App: React.FC = (): JSX.Element => {
  const { isExpanded, isLoggedIn } = useApp();

    console.log(`Key pressed: ${event.key}`);
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
