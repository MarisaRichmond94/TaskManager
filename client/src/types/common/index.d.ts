interface Attachment {
  id: string,
  link: string,
  name: string,
  type: AttachmentType,
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

interface Status {
  id: string,
  name: StatusType,
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
  attachments?: Attachment[],
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  createdAt: string,
  description?: string,
  dueDate: string,
  isPinned: boolean,
  objective: string,
  status?: Status,
  tags?: Tag[],
  updatedAt: string,
  user: User,
};

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};

// misc. types
interface DropdownOption {
  id: string,
  displayName: string,
  name?: string,
};
