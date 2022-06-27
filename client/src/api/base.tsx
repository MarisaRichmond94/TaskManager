import axios from 'axios';

class BaseApi {
  route;
  url;
  constructor(route: string) {
    this.url = `${process.env.REACT_APP_BASE_SERVER_URL}/${route}`;
    this.route = route;
  };

  async post(body: any) {
    let response;

    try {
      response = await axios.post(this.url, body);
    } catch (error) {
      this.handleError(error, 'POST');
    }

    return this.handleResponse(response);
  };

  async get(query = {}) {
    let response;

    try {
      response = await axios.get(`${this.url}?${this.buildQueryString(query)}`);
    } catch (error) {
      this.handleError(error, 'GET');
    }

    return this.handleResponse(response);
  };

  async getById(id: string) {
    let response;

    try {
      response = await axios.get(`${this.url}/${id}`);
    } catch (error) {
      this.handleError(error, 'GET by id');
    }

    return this.handleResponse(response);
  };

  async update(id: string, body: any) {
    let response;

    try {
      response = await axios.patch(`${this.url}/${id}`, body);
    } catch (error) {
      this.handleError(error, 'PATCH');
    }

    return this.handleResponse(response);
  };

  async deleteById(id: string) {
    let response;

    try {
      response = await axios.delete(`${this.url}/${id}`);
    } catch (error) {
      this.handleError(error, 'DELETE by id');
    }

    return this.handleResponse(response);
  };

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
