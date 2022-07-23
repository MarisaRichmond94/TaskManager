import CommentsApi from "api/comments";

const handleCreateComment = async(
  taskToUpdate: Task,
  createCommentDTO: CreateCommentDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const comment = await CommentsApi.post(createCommentDTO);
  taskToUpdate.comments.push(comment);
  onUpdateCallback(taskToUpdate);
};

const handleUpdateComment = async (
  taskToUpdate: Task,
  commentId: string,
  text: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const commentToUpdate = { ...taskToUpdate.comments.find(x => x.id === commentId) };
  commentToUpdate.text = text;
  taskToUpdate.comments = taskToUpdate.comments.map(x => x.id === commentId ? commentToUpdate : x);
  onUpdateCallback(taskToUpdate);
  await CommentsApi.update(commentId, { text });
};

const handleDeleteComment = async(
  taskToUpdate: Task,
  commentIdToDelete: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  taskToUpdate.comments = taskToUpdate.comments.filter(x => x.id !== commentIdToDelete);
  onUpdateCallback(taskToUpdate);
  await CommentsApi.deleteById(commentIdToDelete);
};

export {
  handleCreateComment,
  handleUpdateComment,
  handleDeleteComment,
};
