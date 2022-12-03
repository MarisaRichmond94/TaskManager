declare global {
  interface CreateChecklistItemDTO {
    description: string,
    taskId: string,
  };

  interface UpdateChecklistItemDTO {
    description?: string,
    isCompleted?: boolean,
    orderIndex?: number,
  };
};

export {};
