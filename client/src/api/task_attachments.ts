import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'types/constants/api';

const ROUTE = ApiRoute.taskAttachments;

const create = async (
  body: CreateAttachmentDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Attachment> => {
  const taskAttachment = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) {
    taskToUpdate.attachments.push(taskAttachment);
    onUpdateCallback(taskToUpdate);
  }

  return taskAttachment;
};

const update = async (
  id: string,
  body: UpdateAttachmentDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Attachment> => {
  const taskAttachment = await makeApiRequest( getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, body, id });
  if (onUpdateCallback) {
    taskToUpdate.attachments = taskToUpdate.attachments.map(x => x.id === id ? taskAttachment : x);
    onUpdateCallback(taskToUpdate);
  }

  return taskAttachment;
};

const deleteById = async (
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Boolean> => {
  if (onUpdateCallback) {
    taskToUpdate.attachments = taskToUpdate.attachments.filter(x => x.id !== id);
    onUpdateCallback(taskToUpdate);
  }
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};

export {
  create,
  deleteById,
  update,
};
