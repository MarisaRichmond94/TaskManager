interface UpdateChecklistItemDTO {
  description?: string,
  isCompleted?: boolean,
  orderIndex?: number,
};

interface UpdateTaskDTO {
  dueDate?: number,
  isPinned?: boolean,
  objective?: string,
  description?: string,
};
