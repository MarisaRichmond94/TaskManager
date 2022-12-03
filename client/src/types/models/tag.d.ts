declare global {
  interface Tag {
    id: string,
    hexColor: string,
    name: string,
    tagId: string,
    user: User,
  };
};

export {};
