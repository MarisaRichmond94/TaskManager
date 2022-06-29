import { useEffect, useState } from 'react';

import UsersApi from 'api/users';
import AppContext from 'providers/app/context';

const AppProvider = (props: object) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<undefined | User>();

  // TODO - replace this w/ actual authorization functionality
  useEffect(() => {
    async function getUser() {
      const userResponse = await UsersApi.get();
      setUser(userResponse[0]);
      setIsLoggedIn(true);
    };

    setTimeout(() => {
      getUser();
    }, 100);
  }, []);

  const value = {
    isLoggedIn,
    user,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
