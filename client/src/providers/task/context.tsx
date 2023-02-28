import { createContext } from 'react';

interface ITaskContext {
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
  newCommentId?: string,
  createAttachment: (createAttachmentDTO: CreateAttachmentDTO) => void,
  createChecklistItem: (createChecklistItemDTO: CreateChecklistItemDTO) => void,
  createComment: (createCommentDTO: CreateCommentDTO) => void,
  createTaskTag: (createTaskTagDTO: CreateTaskTagDTO) => void,
  deleteAttachment: (attachmentId: string) => void,
  deleteChecklistItem: (checklistItemIdToDelete: string) => void,
  deleteComment: (commentIdToDelete: string) => void,
  deleteTaskTag: (taskTagIdToDelete: string) => void,
  updateAttachment: (id: string, updateAttachmentDTO: UpdateAttachmentDTO) => void,
  updateChecklistItem: (id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => void,
  updateComment: (id: string, text: string) => void,
  updateStatus: (statusId: string, statusTypeId: string) => void,
  updateTask: (updateTaskDTO: UpdateTaskDTO) => void,
};

const TaskContext = createContext<undefined | ITaskContext>(undefined);

export default TaskContext;
