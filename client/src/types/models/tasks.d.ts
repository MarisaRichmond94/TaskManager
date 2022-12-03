declare global {
  interface Attachment {
    id: string,
    link: string,
    name: string,
    type: AttachmentType,
  };

  interface AttachmentType {
    id: string,
    name: AttachmentTypeName,
  }

  enum AttachmentTypeName {
    jira = "JIRA",
    google = "Google",
    github = "GitHub",
  };

  interface ChecklistItem {
    id: string,
    description: string,
    isCompleted: boolean,
    orderIndex: number,
    createdAt: number,
    updatedAt: number,
  };

  interface Comment {
    id: string,
    text: string,
    createdAt: number,
    updatedAt: number,
  };

  interface Status {
    id: string,
    name: StatusType,
  };

  enum StatusType {
    toDo = 'To Do',
    inProgress = 'In Progress',
    blocked = 'Blocked',
    completed = 'Completed',
    archived = 'Archived',
  };

  interface Tag {
    id: string,
    hexColor: string,
    name: string,
    tagId: string,
    user: User,
  };

  interface Task {
    id: string,
    attachments?: Attachment[],
    checklistItems?: ChecklistItem[],
    comments?: Comment[],
    createdAt: number,
    description?: string,
    dueDate: number,
    isPinned: boolean,
    objective: string,
    status?: Status,
    tags?: Tag[],
    updatedAt: number,
    user: User,
  };

  interface TaskTemplate {
    id: string,
    type: string,
    attachmentType: AttachmentType,
  };

  interface UserTaskData {
    attachmentTypes: AttachmentType[],
    statusTypes: Status[],
    tasks: Task[],
    taskTemplates: TaskTemplate[],
    tags: Tag[],
  };
};

export {};
