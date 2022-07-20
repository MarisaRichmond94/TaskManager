import { ReactElement } from 'react';

import TasksSection from 'routes/tasks/components/panel/tasks/section';
import TaskCard from 'routes/tasks/components/task';
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

const getSectionTasks = (taskMap: Map<string, Task[]>, sectionType: SectionType): ReactElement => {
  const sectionTasks = taskMap.get(sectionType);
  if (!sectionTasks.length) {
    const emptyResponseText = getEmptyResponseText(sectionType);
    return (
      <div className='header-text empty-task-section'>
        {emptyResponseText}
      </div>
    );
  }
  sectionTasks.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))

  return (
    <div className='header-text task-section'>
      {sectionTasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)}
    </div>
  );
};

const buildSections = (taskMap: Map<string, Task[]>): ReactElement[] => {
  return Object.keys(SectionType).map(sectionType => {
    return (
      <TasksSection
        key={`task-section-${sectionType.toLowerCase().split(' ').join('-')}`}
        initiallyVisible={sectionType === SectionType.Today}
        tasks={getSectionTasks(taskMap, SectionType[sectionType])}
        title={generateSectionTitle(SectionType[sectionType])}
        total={taskMap.get(SectionType[sectionType]).length}
        type={SectionType[sectionType].toLowerCase()}
      />
    );
  });
};

export { buildSections };
