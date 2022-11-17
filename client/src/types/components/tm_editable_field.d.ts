declare global {
  interface RichTextChildEntity {
    text: string,

    bold?: boolean,
    code?: boolean,
    italic?: boolean,
    underline?: boolean,
  };

  interface RichTextParentEntity {
    type: string,
    children: RichTextChildEntity[],
  };
};

export {};