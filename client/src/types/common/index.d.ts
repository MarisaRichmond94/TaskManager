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
};

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
};
