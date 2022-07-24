import BaseApi from 'api/base';

class Tags extends BaseApi {
  constructor() {
    super('tags');
  }
};

const TagsApi = new Tags();
export default TagsApi;
