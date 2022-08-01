import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';

import UsersApi from 'api/users';
import AppContext from 'providers/app/context';

const AppProvider = (props: object) => {
  const { isAuthenticated, isLoading, user: googleUser, loginWithRedirect, logout: auth0Logout } = useAuth0();
  const [isExpanded, setIsExpanded] = useState(true);
  const [user, setUser] = useState<undefined | User>();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      localStorage.clear();
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    async function getUser(findOrCreateUserDTO: findOrCreateUserDTO) {
      const userResponse = await UsersApi.post(findOrCreateUserDTO);
      setUser(userResponse);
    };

    if (!!googleUser) {
      const {
        email, given_name: firstName, family_name: lastName, picture: avatar, sub: googleId,
      } = googleUser;
      getUser({ email, firstName, lastName, avatar, googleId });
    }
  }, [googleUser]);

  const logout = () => {
    auth0Logout({ returnTo: window.location.origin });
    localStorage.clear();
  };

  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  const value = {
    isExpanded,
    user,
    logout,
    toggleIsExpanded,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
