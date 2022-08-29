import axios from 'axios';

class BaseApi {
  route;
  url;
  constructor(route: string) {
    this.url = `${process.env.REACT_APP_BASE_SERVER_URL}/${route}`;
    this.route = route;
  };

  // static functionality around authorization
  static accessToken: string = undefined;
  static userId: string = undefined;
  static setAccessToken(accessToken: string) { BaseApi.accessToken = accessToken };
  static setUserId(userId: string) { BaseApi.userId = userId; };

  async post(body: any) {
    return this.makeRequest(
      await axios.post(this.url, body, this.buildConfig()),
      'POST',
    );
  };

  async get(query = {}) {
    return this.makeRequest(
      await axios.get(`${this.url}?${this.buildQueryString(query)}`, this.buildConfig()),
      'GET',
    );
  };

  async getById(id: string) {
    return this.makeRequest(
      await await axios.get(`${this.url}/${id}`, this.buildConfig()),
      'GET by id',
    );
  };

  async update(id: string, body: any) {
    return this.makeRequest(
      await axios.patch(`${this.url}/${id}`, body, this.buildConfig()),
      'PATCH',
    );
  };

  async deleteById(id: string) {
    return this.makeRequest(
      await axios.delete(`${this.url}/${id}`, this.buildConfig()),
      'DELETE by id',
    );
  };

  async makeRequest(request: any, method: string) {
    try {
      return this.handleResponse(request);
    } catch (error) {
      this.handleError(error, method);
    }
  };

  buildConfig = () => {
    return { headers: { userId: BaseApi.userId } };
  }

  buildQueryString = (query: any) => {
    const queryString = Object.keys(query).reduce((accumulation, key) => {
      return accumulation + `${key}=${encodeURIComponent(query[key])}&`;
    }, '');
    return (queryString.endsWith('&')) ? queryString.slice(0, -1) : queryString;
  };

  handleError = (error: any, method: string) => {
    error.message = `${this.route} ${method} failed: ${error.message}`;
    // TODO - route to error page
  };

  handleResponse = (response: any) => {
    if (response?.data) {
      return response.data;
    }
    // TODO - handle error
  };
};

export default BaseApi;
