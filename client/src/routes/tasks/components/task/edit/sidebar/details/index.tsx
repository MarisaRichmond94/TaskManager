import './index.scss';

import { ReactElement } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdOutlineAddTask } from 'react-icons/md';

import { TMCollapsableSection } from 'components/tm_collapsable_section';

interface TaskDetailsProps {
  id: string,
  createdAt: string,
  updatedAt: string,
};

const TaskDetails = ({ id, createdAt, updatedAt }: TaskDetailsProps): ReactElement => {
  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section']}
      id={`task-card-${id}-details`}
      initiallyVisible
      sectionTitle='Details'
    >
      <div className='task-details-container task-sidebar-collapsable-container'>
        <TaskDetail datetime={createdAt} icon={<MdOutlineAddTask />} />
        <TaskDetail datetime={updatedAt} icon={<BsPencilSquare />} />
      </div>
    </TMCollapsableSection>
  );
};

interface TaskDetailProps {
  datetime: string,
  icon: ReactElement,
};

const TaskDetail = ({ datetime, icon }: TaskDetailProps): ReactElement => {
  const date = new Date(datetime);
  return (
    <div className='sub-header-text task-detail'>
      {icon}
      {`${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}`}
    </div>
  );
};

export default TaskDetails;
