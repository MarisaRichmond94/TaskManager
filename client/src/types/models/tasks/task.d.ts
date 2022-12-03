declare global {
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
};

export {};
