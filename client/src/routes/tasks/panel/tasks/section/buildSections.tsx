import { ReactElement } from 'react';

import TasksSection from 'routes/tasks/panel/tasks/section';
import { ARCHIVED_TASK_STATUS_NAME } from 'settings';
import { getDayMonthDateString, getModifiedDate } from 'utils/date';

enum SectionType {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Upcoming = 'Upcoming',
  Overdue = 'Overdue',
  Archived = 'Archived',
};

const generateSectionTitle = (sectionType: string): string => {
  const today = new Date();
  switch (sectionType) {
    case `${SectionType.Today}`:
      return `${sectionType} (${getDayMonthDateString(today)})`;
    case `${SectionType.Tomorrow}`:
      const tomorrow = getModifiedDate(today, 1);
      return `${sectionType} (${getDayMonthDateString(tomorrow)})`
    case `${SectionType.Upcoming}`:
    case `${SectionType.Overdue}`:
    default:
      return sectionType;
  }
};

const getEmptyResponseText = (sectionType: SectionType): string => {
  switch (sectionType) {
    case `${SectionType.Today}`:
    case `${SectionType.Tomorrow}`:
      return `No tasks due ${sectionType.toLowerCase()}`
    case `${SectionType.Upcoming}`:
    case `${SectionType.Overdue}`:
    default:
      return `No ${sectionType.toLowerCase()} tasks`;
  }
};

const buildSections = (taskMap: Map<string, Task[]>, showArchived: boolean): ReactElement[] => {
  return Object.keys(SectionType).map(sectionType => {
    if (!showArchived && sectionType === ARCHIVED_TASK_STATUS_NAME) return null;
    const sectionTasks = taskMap.get(SectionType[sectionType]);

    return (
      <TasksSection
        key={`task-section-${sectionType.toLowerCase().split(' ').join('-')}`}
        emptyResponseText={getEmptyResponseText(SectionType[sectionType])}
        initiallyVisible={
          (sectionType === SectionType.Today || !!sectionTasks.length) &&
          sectionType !== SectionType.Archived
        }
        tasks={sectionTasks}
        title={generateSectionTitle(SectionType[sectionType])}
        total={taskMap.get(SectionType[sectionType]).length}
        type={SectionType[sectionType].toLowerCase()}
      />
    );
  }).filter(x => x !== null);
};

export { buildSections };
