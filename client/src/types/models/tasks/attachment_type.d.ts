declare global {
  interface AttachmentType {
    id: string,
    name: AttachmentTypeName,
  }

  enum AttachmentTypeName {
    jira = "JIRA",
    google = "Google",
    github = "GitHub",
  };
};

export {};
