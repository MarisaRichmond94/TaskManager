declare global {
  interface CreateAttachmentDTO {
    attachmentTypeId: string,
    link: string,
    name?: string,
    taskId: string,
  };

  interface UpdateAttachmentDTO {
    attachmentTypeId?: string,
    link?: string,
    name?: string,
  };
};

export {};
