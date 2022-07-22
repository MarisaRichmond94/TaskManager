import BaseApi from 'api/base';

class ChecklistItems extends BaseApi {
  constructor() {
    super('checklist_items');
  }
};

const ChecklistItemsApi = new ChecklistItems();
export default ChecklistItemsApi;
