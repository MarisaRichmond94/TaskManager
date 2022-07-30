import BaseApi from 'api/base';

class Attachments extends BaseApi {
  constructor() {
    super('attachments');
  }
};

const AttachmentsApi = new Attachments();
export default AttachmentsApi;
