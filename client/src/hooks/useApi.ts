import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { ApiRoute } from 'types/constants/api';
import { buildHeaders, buildUrl, makeRequest } from 'utils/api';

const useApi = (route: ApiRoute, options: ApiRequestOptions) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({ error: null, loading: true, data: null });
  const [refreshIndex, setRefreshIndex] = useState(0);

  const { method, id, body, query } = options;

  useEffect(() => {
    (async () => {
      try {
        const headers = buildHeaders(
          await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_0_AUDIENCE,
            scope: process.env.REACT_APP_AUTH_0_SCOPE,
          })
        );
        const response = await makeRequest(buildUrl(route, id, query), method, headers, body);
        const data = response?.data;
        setState({ ...state, data, error: null, loading: false });
        if (route === ApiRoute.users) window.localStorage.setItem('userId', data?.id);
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};

export { useApi };
