import 'global.scss';

import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'app';
import { AppProvider, AppHotkeysProvider } from 'providers';
import reportWebVitals from 'reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={process.env.REACT_APP_AUTH_0_CLIENT_ID}
      domain={process.env.REACT_APP_AUTH_0_DOMAIN}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH_0_AUDIENCE}
      scope='read:current_user'
      useRefreshTokens={true}
    >
      <BrowserRouter>
        <AppProvider>
          <AppHotkeysProvider>
            <App />
          </AppHotkeysProvider>
        </AppProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
