const CONTROL_KEY_STROKES = {
  sections: {
    collapseAll: 'C',
    expandAll: 'E',
    collapse: 'ArrowDown',
    goToPrevious: 'ArrowLeft',
    goToNext: 'ArrowRight',
    expand: 'ArrowUp',
  },
};

const SHIFT_KEY_STROKES = {
  app: {
    navigateHome: 'H',
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
  task: {
    archive: 'A',
    delete: 'K',
    close: 'X',
    create: 'N',
    pin: 'P',
    prioritize: 'V',
  },
  tasks: {
    sort: 'S',
  },
};

export {
  CONTROL_KEY_STROKES,
  SHIFT_KEY_STROKES,
};
