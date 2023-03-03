import { ReactElement } from 'react';

import Section from 'routes/tasks/section';
import { STATUS_NAMES } from 'settings/task';
import { SectionType } from 'types/constants/tasks';
import { getDayMonthDateString, getModifiedDate } from 'utils';

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
    if (!showArchived && sectionType === STATUS_NAMES.archived) return null;
    const sectionTasks = taskMap.get(SectionType[sectionType]);

    return (
      <Section
        key={`task-section-${sectionType.toLowerCase().split(' ').join('-')}`}
        emptyResponseText={getEmptyResponseText(SectionType[sectionType])}
        tasks={sectionTasks}
        title={generateSectionTitle(SectionType[sectionType])}
        total={taskMap.get(SectionType[sectionType]).length}
        type={SectionType[sectionType]}
      />
    );
  }).filter(x => x !== null);
};

export { buildSections };
