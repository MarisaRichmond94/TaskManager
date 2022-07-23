import BaseApi from 'api/base';

class Comments extends BaseApi {
  constructor() {
    super('comments');
  }
};

const CommentsApi = new Comments();
export default CommentsApi;
