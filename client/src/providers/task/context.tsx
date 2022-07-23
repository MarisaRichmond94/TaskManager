import { createContext } from 'react';

interface TaskContextType {
  id: string,
  attachments?: Attachment[],
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  createdAt: number,
  description?: string,
  dueDate: number,
  isArchived: boolean,
  isPinned: boolean,
  objective: string,
  status?: Status,
  tags?: Tag[],
  updatedAt: number,
  createChecklistItem: (createChecklistItemDTO: CreateChecklistItemDTO) => void,
  createComment: (createCommentDTO: CreateCommentDTO) => void,
  deleteChecklistItem: (checklistItemIdToDelete: string) => void,
  deleteComment: (commentIdToDelete: string) => void,
  updateChecklistItem: (id: string, updateChecklistItemDTO: UpdateChecklistItemDTO) => void,
  updateComment: (id: string, text: string) => void,
  updateStatus: (statusId: string, statusTypeId: string) => void,
  updateTask: (updateTaskDTO: UpdateTaskDTO) => void,
};

const TaskContext = createContext<undefined | TaskContextType>(undefined);

export default TaskContext;
