declare global {
  interface CreateTagDTO {
    hexColor: string,
    name: string,
  };

  interface UpdateTagDTO {
    hexColor?: string,
    name?: string,
  };
};

export {};
