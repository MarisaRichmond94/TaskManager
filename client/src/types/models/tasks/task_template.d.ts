declare global {
  interface TaskTemplate {
    id: string,
    type: string,
    attachmentType: AttachmentType,
  };
};

export {};
