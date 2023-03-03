import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import * as UsersApi from 'api/users';

interface AppContextProps {
  isExpanded: boolean,
  user?: User,
  logout: () => void,
  toggleIsExpanded: () => void,
};

const AppContext = createContext<undefined | AppContextProps>(undefined);

const AppProvider = (props: object) => {
  const {
    isAuthenticated, isLoading, user: googleUser,
    getAccessTokenSilently, loginWithRedirect, logout: auth0Logout,
  } = useAuth0();
  const [isExpanded, setIsExpanded] = useState(true);
  const [user, setUser] = useState<undefined | User>();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      localStorage.clear();
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    async function getUser(body: FindOrCreateUserDTO) {
      await UsersApi.get(body, getAccessTokenSilently, setUser);
    };

    if (!!googleUser) {
      const {
        email, given_name: firstName, family_name: lastName, picture: avatar, sub: googleId,
      } = googleUser;
      getUser({ email, firstName, lastName, avatar, googleId });
    }
  }, [getAccessTokenSilently, googleUser]);

  const logout = () => {
    auth0Logout({ returnTo: window.location.origin });
    localStorage.clear();
  };

  const toggleIsExpanded = useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const value = {
    isExpanded,
    user,
    logout,
    toggleIsExpanded,
  };

  return <AppContext.Provider value={value} {...props} />;
};

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp should only be used within the AppProvider.');
  }
  return context;
}

export {
  AppProvider,
  useApp,
};
