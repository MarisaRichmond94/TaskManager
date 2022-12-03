declare global {
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
};

export {};
