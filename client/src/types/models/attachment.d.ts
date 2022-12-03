declare global {
  interface Attachment {
    id: string,
    link: string,
    name: string,
    type: AttachmentType,
  };
};

export {};
