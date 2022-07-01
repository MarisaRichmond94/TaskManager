import './index.scss';

import { ReactElement, ReactNode } from 'react';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';

enum SectionTypes {
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
      case `${SectionTypes.Today}`:
        return `${sectionType} (${today.getMonth() + 1}/${today.getDate()})`
      case `${SectionTypes.Tomorrow}`:
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${sectionType} (${tomorrow.getMonth() + 1}/${tomorrow.getDate()})`
      case `${SectionTypes.Upcoming}`:
      case `${SectionTypes.Overdue}`:
      default:
        return sectionType;
    }
  };

  const getEmptyResponseText = (sectionType: string): string => {
    switch (sectionType) {
      case `${SectionTypes.Today}`:
      case `${SectionTypes.Tomorrow}`:
        return `No tasks due ${sectionType.toLowerCase()}`
      case `${SectionTypes.Upcoming}`:
      case `${SectionTypes.Overdue}`:
      default:
        return `No ${sectionType.toLowerCase()} tasks`;
    }
  };

  const getSectionTasks = (sectionType: string): ReactElement => {
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
            tasks={getSectionTasks(SectionTypes.Today)}
            title={generateSectionTitle(SectionTypes.Today)}
            total={taskMap.get(SectionTypes.Today).length}
            type={SectionTypes.Today.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionTypes.Tomorrow)}
            title={generateSectionTitle(SectionTypes.Tomorrow)}
            total={taskMap.get(SectionTypes.Tomorrow).length}
            type={SectionTypes.Tomorrow.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionTypes.Upcoming)}
            title={generateSectionTitle(SectionTypes.Upcoming)}
            total={taskMap.get(SectionTypes.Upcoming).length}
            type={SectionTypes.Upcoming.toLowerCase()}
          />
          <TasksSection
            tasks={getSectionTasks(SectionTypes.Overdue)}
            title={generateSectionTitle(SectionTypes.Overdue)}
            total={taskMap.get(SectionTypes.Overdue).length}
            type={SectionTypes.Overdue.toLowerCase()}
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
