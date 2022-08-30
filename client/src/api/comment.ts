import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from "types/constants";

const ROUTE = ApiRoute.comments;

const create = async (
  body: CreateCommentDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Comment> => {
  const comment = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) {
    taskToUpdate.comments.push(comment);
    onUpdateCallback(taskToUpdate);
  }

  return comment;
};

const update = async (
  id: string,
  text: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Comment> => {
  if (onUpdateCallback) {
    const commentToUpdate = { ...taskToUpdate.comments.find(x => x.id === id) };
    commentToUpdate.text = text;
    taskToUpdate.comments = taskToUpdate.comments.map(x => x.id === id ? commentToUpdate : x);
    onUpdateCallback(taskToUpdate);
  }

  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, id, body: { text } });
};

const deleteById = async (
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<boolean> => {
  if (onUpdateCallback) {
    taskToUpdate.comments = taskToUpdate.comments.filter(x => x.id !== id);
    onUpdateCallback(taskToUpdate);
  }
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};

export {
  create,
  deleteById,
  update,
};
