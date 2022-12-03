declare global {
  interface CreateTaskDTO {
    dueDate: number,
    objective: string,
    taskTemplate?: TaskTemplate,
    link?: string,
  };

  interface UpdateTaskDTO {
    dueDate?: number,
    isPinned?: boolean,
    objective?: string,
    description?: string,
  };
};

export {};
