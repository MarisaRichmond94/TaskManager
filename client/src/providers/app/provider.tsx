import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from 'react';

import * as UsersApi from 'api/users';
import AppContext from 'providers/app/context';

const AppProvider = (props: object) => {
  const {
    isAuthenticated, isLoading, user: googleUser,
    getAccessTokenSilently, loginWithRedirect, logout: auth0Logout,
  } = useAuth0();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
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

  const toggleIsOverlayActive = useCallback(() => {
    setIsOverlayActive(!isOverlayActive);
  }, [isOverlayActive]);

  const value = {
    isExpanded,
    isOverlayActive,
    user,
    logout,
    toggleIsExpanded,
    toggleIsOverlayActive,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
