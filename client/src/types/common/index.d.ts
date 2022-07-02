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

interface SubTask {
  id: string,
  objective: string,
  description?: string,
  dueDate: string,
  createdAt: string,
  updatedAt: string,
  user: User,
  tags?: Tag[],
  comments?: Comment[],
};

interface Tag {
  id: string,
  name: string,
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
  subTasks?: SubTask[],
  comments?: Comment[],
};

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};
