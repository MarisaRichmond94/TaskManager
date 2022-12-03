declare global {
  interface ChecklistItem {
    id: string,
    description: string,
    isCompleted: boolean,
    orderIndex: number,
    createdAt: number,
    updatedAt: number,
  };
};

export {};
