const SHIFT_KEY_STROKES = {
  app: {
    navigateHome: 'H',
    helpMenu: 'M',
    toggleSidebar: 'T',
    navigateTasks: '!',
    navigateNotes: '@',
    navigateGoals: '#',
  },
  filter: {
    clear: 'W',
    focus: 'R',
  },
  search: {
    focus: 'F',
  },
  section: {
    grabTask: 'G',
    previous: 'ArrowUp',
    next: 'ArrowDown',
  },
  sections: {
    collapseAll: 'C',
    expandAll: 'E',
    toggleCollapseState: 'B',
    goToPrevious: '<',
    goToNext: '>',
  },
  task: {
    archive: 'A',
    delete: 'K',
    close: 'X',
    create: 'N',
    pin: 'P',
    prioritize: 'V',
  },
  tasks: {
    downloadReport: 'D', // TODO - complete this as part of future feature
    sort: 'S',
  },
};

const UNIVERSAL_HOTKEY_SECTIONS = ['app', 'filter', 'search'];
const HOTKEY_SECTIONS_BY_PATH = {
  tasks: [...UNIVERSAL_HOTKEY_SECTIONS, 'section', 'sections', 'task', 'tasks'],
}

export {
  HOTKEY_SECTIONS_BY_PATH,
  SHIFT_KEY_STROKES,
  UNIVERSAL_HOTKEY_SECTIONS,
};
