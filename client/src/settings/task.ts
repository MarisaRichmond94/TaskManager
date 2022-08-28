const STATUS_NAMES = {
  archived: 'Archived',
  blocked: 'Blocked',
  inProgress: 'In Progress',
  completed: 'Completed',
  toDo: 'To Do',
};
const ARCHIVED_TASK_STATUS_NAMES = [STATUS_NAMES.archived, STATUS_NAMES.completed];
const TASK_MAP_SYNC_INTERVAL = 60000;

const tagRed = '#FF9AA2';
const tagPink = '#FFB7B2';
const tagOrange = '#FFDAC1';
const tagYellow = '#F3F3AB';
const tagGreen = '#E2F0CB';
const tagTeal = '#B5EAD7';
const tagLightBlue = '#D7E5EC';
const tagBlue = '#C7CEEA';
const tagPurple = '#C2A2C2';

const TAG_COLORS = [
  tagRed,
  tagPink,
  tagOrange,
  tagYellow,
  tagGreen,
  tagTeal,
  tagLightBlue,
  tagBlue,
  tagPurple,
];

export {
  ARCHIVED_TASK_STATUS_NAMES,
  STATUS_NAMES,
  TAG_COLORS,
  TASK_MAP_SYNC_INTERVAL,
};
