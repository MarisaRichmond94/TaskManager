import './index.scss';

import { FC, ReactNode } from 'react';

import TMCollapsableSection from 'components/tm_collapsable_section';

interface ITasksSection {
  initiallyVisible?: boolean,
  tasks: ReactNode,
  title: string,
  total: number,
  type: string,
};

const TasksSection: FC<ITasksSection> = ({
  initiallyVisible = false,
  tasks,
  title,
  total,
  type,
}) => {
  return (
    <TMCollapsableSection
      classNames={['off-white']}
      id={`${type}-collapsable`}
      initiallyVisible={initiallyVisible}
      rightBlock={<p className='task-count'>({total})</p>}
      sectionTitle={title}
    >
      <div className='tasks-container'>
        {tasks}
      </div>
    </TMCollapsableSection>
  );
};

export default TasksSection;
