import { useEffect, useState } from 'react';

import BaseApi from 'api/base';
import UsersApi from 'api/users';
import AppContext from 'providers/app/context';

const AppProvider = (props: object) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [user, setUser] = useState<undefined | User>();

  // TODO - replace this w/ actual authorization functionality
  useEffect(() => {
    async function getUser() {
      const userResponse = await UsersApi.get();
      setUser(userResponse[0]);
      setIsLoggedIn(true);
      BaseApi.setUserId(userResponse[0].id);
    };

    setTimeout(() => {
      getUser();
    }, 100);
  }, []);

  const toggleIsExpanded = () => { setIsExpanded(!isExpanded); };

  const value = {
    isExpanded,
    isLoggedIn,
    user,
    toggleIsExpanded,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
