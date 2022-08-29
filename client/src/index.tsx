import 'global.scss';

import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'app';
import { AppProvider } from 'providers/app';
import { AppHotkeysProvider } from 'providers/hotkeys/app';
import reportWebVitals from 'reportWebVitals';
import authSettings from 'auth_config.json';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={authSettings.clientId}
      domain={authSettings.domain}
      redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URL}
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
