// Create DTOs
interface CreateChecklistItemDTO {
  description: string,
  taskId: string,
};

interface CreateCommentDTO {
  taskId: string,
  text: string,
};

interface CreateTagDTO {
  hexColor: string,
  name: string,
};

interface CreateTaskTagDTO {
  taskId: string,
  tagId: string,
};

// Update DTOs
interface UpdateChecklistItemDTO {
  description?: string,
  isCompleted?: boolean,
  orderIndex?: number,
};

interface UpdateTagDTO {
  hexColor: string?,
  name: string?,
};

interface UpdateTaskDTO {
  dueDate?: number,
  isPinned?: boolean,
  objective?: string,
  description?: string,
};
