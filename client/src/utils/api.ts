import axios, { AxiosResponse } from 'axios';

import { ApiMethod, ApiRoute } from 'types/constants';

interface Headers { headers: ApiHeaders };

const buildHeaders = (accessToken?: string): Headers => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      userId: window.localStorage.getItem('userId'),
    }
  };
};

const buildQueryString = (query: { [key: string]: any }): string => {
  const queryString = Object.keys(query).reduce((accumulation, key) => {
    return accumulation + `${key}=${encodeURIComponent(query[key])}&`;
  }, '');

  return (queryString.endsWith('&')) ? queryString.slice(0, -1) : queryString;
};

const buildUrl = (route: ApiRoute, id?: string, query?: { [key: string]: any }): string => {
  let baseUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/${route}`;
  if (id) baseUrl = `${baseUrl}/${id}`;
  if (query) baseUrl = `${baseUrl}?${buildQueryString(query)}`;

  return baseUrl;
};

const makeRequest = async (
  url: string,
  method: ApiMethod,
  headers?: { [key: string]: any },
  body?: { [key: string]: any },
): Promise<AxiosResponse> => {
  switch (method) {
    case ApiMethod.post:
      return axios.post(url, body, headers);
    case ApiMethod.get:
    case ApiMethod.getById:
      return axios.get(url, headers);
    case ApiMethod.patch:
      return axios.patch(url, body, headers);
    case ApiMethod.delete:
    case ApiMethod.deleteById:
      return axios.delete(url, headers);
  }
};

const makeApiRequest = async (
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  route: ApiRoute,
  options: ApiRequestOptions,
) => {
  const { method, id, body, query } = options;

  try {
    const headers = buildHeaders(
      await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_0_AUDIENCE,
        scope: process.env.REACT_APP_AUTH_0_SCOPE,
      })
    );
    const response = await makeRequest(buildUrl(route, id, query), method, headers, body);
    if (route === ApiRoute.users) window.localStorage.setItem('userId', response?.data?.id);
    return response?.data;
  } catch (error) {
    console.log(error);
    // TODO - handle this
  }
};

export {
  buildHeaders,
  buildUrl,
  makeApiRequest,
  makeRequest,
};
