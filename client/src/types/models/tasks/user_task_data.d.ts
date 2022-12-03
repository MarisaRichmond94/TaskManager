declare global {
  interface UserTaskData {
    attachmentTypes: AttachmentType[],
    statusTypes: Status[],
    tasks: Task[],
    taskTemplates: TaskTemplate[],
    tags: Tag[],
  };
};

export {};
