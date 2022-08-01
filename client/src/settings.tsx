// hotkeys
export const HOT_KEYS = {
  // CONTROL + KEYS
  COLLAPSE_SECTION_KEY: 'ArrowLDown', // TODO - should collapse a single task section
  GO_TO_PREVIOUS_SECTION_KEY: 'ArrowLeft', // TODO - should navigate to the previous section
  GO_TO_NEXT_SECTION_KEY: 'ArrowRight', // TODO - should navigate to the next section
  EXPAND_SECTION_KEY: 'ArrowUp', // TODO - should expend a single task section
  // SHIFT + KEYS
  ARCHIVE_TASK_KEY: 'A', // TODO - should archive the active task
  COLLAPSE_ALL_SECTIONS_KEY: 'C', // TODO - should collapse all sections
  FOCUS_DESCRIPTION_KEY: 'D', // TODO - should auto focus the description section of an active task
  EXPAND_ALL_SECTIONS_KEY: 'E', // TODO - should expand aall task sections
  FOCUS_SEARCH_KEY: 'F', // TODO - should auto focus the search bar
  GRAB_SECTION_TASK_KEY: 'G', // TODO - should focus the first task in the active section
  DELETE_TASK_KEY: 'K', // TODO - should delete the active task
  NEW_TASK_KEY: 'N',
  FOCUS_OBJECTIVE_KEY: 'O', // TODO - should auto focus the description of an active task
  PIN_TASK_KEY: 'P', // TODO - should pin the active task
  FOCUS_FILTER_KEY: 'R', // TODO - should auto focus the filter section
  TOGGLE_SORT_KEY: 'S', // TODO - should toggle the sorting between ASC and DESC
  TOGGLE_KEY: 'T',
  PRIORITIZE_TASK_KEY: 'V', // TODO - should change the active task's dueDate to end of the current day
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
