interface Attachment {
  id: string,
  link: string,
  name: string,
  attachmentType: AttachmentType,
};

enum AttachmentType {
    jira = "JIRA",
    google = "Google",
    github = "GitHub",
};

interface ChecklistItem {
  id: string,
  description: string,
  isCompleted: boolean,
  orderIndex: number,
  createdAt: string,
  updatedAt: string,
};

interface Comment {
  id: string,
  text: string,
  createdAt: string,
  updatedAt: string,
};

enum StatusType {
  toDo = 'To Do',
  complete = 'Complete',
  inProgress = 'In Progress',
  archived = 'Archived',
  blocked = 'Blocked',
};

interface Tag {
  id: string,
  name: string,
  hexColor: string,
  user: User,
};

interface Task {
  id: string,
  objective: string,
  description?: string,
  dueDate: string,
  isPinned: boolean,
  createdAt: string,
  updatedAt: string,
  user: User,
  tags?: Tag[],
  status?: StatusType,
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
};

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};
