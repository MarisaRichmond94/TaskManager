interface DropdownOption {
  id: string,
  displayName: string,
  name?: string,
};

interface KeyStroke {
  altKey?: boolean,
  ctrlKey?: boolean,
  shiftKey?: boolean,
  key: string,
};

type SearchableOption = {
  id: string,
  searchableValue: string,
  content: ReactElement | string,
};

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar: string,
};
