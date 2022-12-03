// Create DTOs
interface CreateAttachmentDTO {
  attachmentTypeId: string,
  link: string,
  name?: string,
  taskId: string,
};

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

interface CreateTaskDTO {
  dueDate: number,
  objective: string,
  taskTemplate?: TaskTemplate,
  link?: string,
};

interface CreateTaskTagDTO {
  taskId: string,
  tagId: string,
};

// Read DTOs
interface FindOrCreateUserDTO {
  email: string,
  firstName: string,
  lastName: string,
  avatar: string,
  googleId: string,
};

// Update DTOs
interface UpdateAttachmentDTO {
  attachmentTypeId?: string,
  link?: string,
  name?: string,
};

interface UpdateChecklistItemDTO {
  description?: string,
  isCompleted?: boolean,
  orderIndex?: number,
};

interface UpdateTagDTO {
  hexColor?: string,
  name?: string,
};

interface UpdateTaskDTO {
  dueDate?: number,
  isPinned?: boolean,
  objective?: string,
  description?: string,
};
