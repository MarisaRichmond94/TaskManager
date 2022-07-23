import CommentsApi from "api/comments";

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

export { handleUpdateComment };
