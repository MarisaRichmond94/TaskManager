import './index.scss';

import { ReactElement, ReactNode } from 'react';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';

enum SectionType {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Upcoming = 'Upcoming',
  Overdue = 'Overdue',
};

const TasksPanel = (): ReactElement => {
  const { taskMap } = useTasks();

  const generateSectionTitle = (sectionType: string): string => {
    const today = new Date();
    switch (sectionType) {
      case `${SectionType.Today}`:
        return `${sectionType} (${today.getMonth() + 1}/${today.getDate()})`
      case `${SectionType.Tomorrow}`:
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${sectionType} (${tomorrow.getMonth() + 1}/${tomorrow.getDate()})`
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

  const getSectionTasks = (sectionType: SectionType): ReactElement => {
    const sectionTasks = taskMap.get(sectionType);
    if (!sectionTasks.length) {
      const emptyResponseText = getEmptyResponseText(sectionType);
      return <div className='header-text empty-task-section'>{emptyResponseText}</div>
    }
    return (
      <div className='header-text task-section'>
        TODO - put tasks here
      </div>
    );
  };

  return (
    taskMap
      ? (
        <div className='tm-panel' id='tasks-panel'>
          <TasksSection
            tasks={getSectionTasks(SectionType.Today)}
            title={generateSectionTitle(SectionType.Today)}
            total={taskMap.get(SectionType.Today).length}
            type={SectionType.Today.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionType.Tomorrow)}
            title={generateSectionTitle(SectionType.Tomorrow)}
            total={taskMap.get(SectionType.Tomorrow).length}
            type={SectionType.Tomorrow.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionType.Upcoming)}
            title={generateSectionTitle(SectionType.Upcoming)}
            total={taskMap.get(SectionType.Upcoming).length}
            type={SectionType.Upcoming.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionType.Overdue)}
            title={generateSectionTitle(SectionType.Overdue)}
            total={taskMap.get(SectionType.Overdue).length}
            type={SectionType.Overdue.toLowerCase()}
          />
        </div>
      )
    : <TMLoader color='#99B83B' text='categorizing tasks...' />
  );
};

interface TasksSectionProps {
  tasks: ReactNode,
  title: string,
  total: number,
  type: string,
};

const TasksSection = ({tasks, title, total, type }: TasksSectionProps): ReactElement => {
  return (
    <TMCollapsableSection
      classNames={['off-white']}
      id={`${type}-collapsable`}
      initiallyVisible
      rightBlock={<p className='task-count'>({total})</p>}
      sectionTitle={title}
    >
      <div className='tasks-container'>
        {tasks}
      </div>
    </TMCollapsableSection>
  );
};

export default TasksPanel;
