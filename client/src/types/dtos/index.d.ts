// Create DTOs
interface CreateChecklistItemDTO {
  description: string,
  taskId: string,
};
interface CreateCommentDTO {
  taskId: string,
  text: string,
};

// Update DTOs
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
