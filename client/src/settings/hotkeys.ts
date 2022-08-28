const CONTROL_KEY_STROKES = {
  sections: {
    collapseAll: 'C', // TODO
    expandAll: 'E', // TODO
    collapse: 'ArrowDown', // TODO
    goToPrevious: 'ArrowLeft', // TODO
    goToNext: 'ArrowRight', // TODO
    expand: 'ArrowUp', // TODO
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
    grabTask: 'G', // TODO
    previous: 'ArrowUp', // TODO
    next: 'ArrowDown', // TODO
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
