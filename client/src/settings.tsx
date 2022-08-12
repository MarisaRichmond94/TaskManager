// hotkeys
export const HOT_KEYS = {
  // CONTROL + KEYS
  COLLAPSE_ALL_SECTIONS_KEY: 'C', // TODO - should collapse all sections
  EXPAND_ALL_SECTIONS_KEY: 'E', // TODO - should expand aall task sections
  COLLAPSE_SECTION_KEY: 'ArrowLDown', // TODO - should collapse a single task section
  GO_TO_PREVIOUS_SECTION_KEY: 'ArrowLeft', // TODO - should navigate to the previous section
  GO_TO_NEXT_SECTION_KEY: 'ArrowRight', // TODO - should navigate to the next section
  EXPAND_SECTION_KEY: 'ArrowUp', // TODO - should expend a single task section
  // SHIFT + KEYS
  ARCHIVE_ACTIVE_TASK_KEY: 'A',
  FOCUS_DESCRIPTION_KEY: 'D', // TODO - should auto focus the description section of an active task
  FOCUS_SEARCH_KEY: 'F',
  GRAB_SECTION_TASK_KEY: 'G', // TODO - should focus the first task in the active section
  NAVIGATE_HOME: 'H',
  DELETE_ACTIVE_TASK_KEY: 'K',
  NEW_TASK_KEY: 'N',
  FOCUS_OBJECTIVE_KEY: 'O', // TODO - should auto focus the description of an active task
  PIN_ACTIVE_TASK_KEY: 'P',
  FOCUS_FILTER_KEY: 'R',
  TOGGLE_SORT_KEY: 'S',
  TOGGLE_KEY: 'T',
  PRIORITIZE_ACTIVE_TASK_KEY: 'V', // TODO - should change the active task's dueDate to end of the current day
  WIPE_ALL_FILTERS: 'W',
  CLOSE_ACTIVE_TASK_KEY: 'X',
  GO_TO_PREVIOUS_TASK_KEY: 'ArrowLeft', // TODO - should navigate to the previous task in the tasks list
  GO_TO_NEXT_TASK_KEY: 'ArrowRight', // TODO - should navigate to the next task in the tasks list
  SHIFTED_1_KEY: '!',
  SHIFTED_2_KEY: '@',
  SHIFTED_3_KEY: '#',
};

// layout
export const HEADER_HEIGHT = 55;
export const WORKSPACE_PANEL_HEIGHT = 420;

// misc.
export const ARCHIVED_TASK_STATUS_NAME = 'Archived';
export const BLOCKED_TASK_STATUS_NAME = 'Blocked';
export const COMPLETED_TASK_STATUS_NAME = 'Completed';
export const IN_PROGRESS_TASK_STATUS_NAME = 'In Progress';
export const TO_DO_TASK_STATUS_NAME = 'To Do';
export const TASK_STATUS_NAMES = {
  archived: ARCHIVED_TASK_STATUS_NAME,
  blocked: BLOCKED_TASK_STATUS_NAME,
  completed: COMPLETED_TASK_STATUS_NAME,
  inProgress: IN_PROGRESS_TASK_STATUS_NAME,
  toDo: TO_DO_TASK_STATUS_NAME,
};
export const ARCHIVED_TASK_STATUS_NAMES = [ARCHIVED_TASK_STATUS_NAME, COMPLETED_TASK_STATUS_NAME]
export const TASK_MAP_SYNC_INTERVAL = 60000;

// routes
export const ROUTES = {
  GOALS_ROUTE: '/goals',
  NOTES_ROUTE: '/notes',
  ROOT_ROUTE: '/tasks',
  TASKS_ROUTE: '/tasks',
};
export const GOALS_ROUTE = ROUTES.GOALS_ROUTE;
export const NOTES_ROUTE = ROUTES.NOTES_ROUTE;
export const ROOT_ROUTE = ROUTES.TASKS_ROUTE;
export const TASKS_ROUTE = ROUTES.TASKS_ROUTE;

// tag colors
const TAG_RED = '#FF9AA2';
const TAG_PINK = '#FFB7B2';
const TAG_ORANGE = '#FFDAC1';
const TAG_YELLOW = '#F3F3AB';
const TAG_GREEN = '#E2F0CB';
const TAG_TEAL = '#B5EAD7';
const TAG_LIGHT_BLUE = '#D7E5EC';
const TAG_BLUE = '#C7CEEA';
const TAG_PURPLE = '#C2A2C2';
export const TAG_COLORS = [
  TAG_RED,
  TAG_PINK,
  TAG_ORANGE,
  TAG_YELLOW,
  TAG_GREEN,
  TAG_TEAL,
  TAG_LIGHT_BLUE,
  TAG_BLUE,
  TAG_PURPLE,
];
