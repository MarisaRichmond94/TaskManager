import './index.scss';

import { ReactElement, ReactNode } from 'react';

import { TMCollapsableSection } from 'components/tm_collapsable_section';

interface TasksSectionProps {
  initiallyVisible?: boolean,
  tasks: ReactNode,
  title: string,
  total: number,
  type: string,
};

const TasksSection = ({
  initiallyVisible = false,
  tasks,
  title,
  total,
  type,
}: TasksSectionProps): ReactElement => {
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
