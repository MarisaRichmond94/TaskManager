import BaseApi from 'api/base';

class Statuses extends BaseApi {
  constructor() {
    super('statuses');
  }
};

const StatusesApi = new Statuses();
export default StatusesApi;
