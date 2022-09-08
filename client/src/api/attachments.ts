import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from "types/constants";

const ROUTE = ApiRoute.attachments;

const create = async (
  body: CreateAttachmentDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Attachment> => {
  const attachment = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) {
    taskToUpdate.attachments.push(attachment);
    onUpdateCallback(taskToUpdate);
  }

  return attachment;
};

const update = async (
  id: string,
  body: UpdateAttachmentDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Attachment> => {
  const attachment = await makeApiRequest( getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, body, id });
  if (onUpdateCallback) {
    taskToUpdate.attachments = taskToUpdate.attachments.map(x => x.id === id ? attachment : x);
    onUpdateCallback(taskToUpdate);
  }

  return attachment;
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
