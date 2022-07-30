import AttachmentsApi from "api/attachments";

const handleCreateAttachment = async (
  taskToUpdate: Task,
  createAttachmentDTO: CreateAttachmentDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const newAttachment = await AttachmentsApi.post(createAttachmentDTO);
  taskToUpdate.attachments.push(newAttachment);
  onUpdateCallback(taskToUpdate);
};

const handleUpdateAttachment = async (
  taskToUpdate: Task,
  attachmentId: string,
  updateAttachmentDTO: UpdateAttachmentDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const updatedAttachment = await AttachmentsApi.update(attachmentId, updateAttachmentDTO);
  taskToUpdate.attachments = taskToUpdate.attachments.map(
    x => x.id === attachmentId ? updatedAttachment : x
  );
  onUpdateCallback(taskToUpdate);
};

export {
  handleCreateAttachment,
  handleUpdateAttachment,
};
