import './index.scss';

import { ReactElement } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdOutlineAddTask } from 'react-icons/md';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { getFullDateString, toClientDatetime } from 'utils/date';

interface TaskDetailsProps {
  id: string,
  createdAt: number,
  updatedAt: number,
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
        <TaskDetail secondsSinceEpoch={createdAt} icon={<MdOutlineAddTask />} />
        <TaskDetail secondsSinceEpoch={updatedAt} icon={<BsPencilSquare />} />
      </div>
    </TMCollapsableSection>
  );
};

interface TaskDetailProps {
  secondsSinceEpoch: number,
  icon: ReactElement,
};

const TaskDetail = ({ secondsSinceEpoch, icon }: TaskDetailProps): ReactElement => {
  const date = toClientDatetime(secondsSinceEpoch);
  return (
    <div className='sub-header-text task-detail'>
      {icon}
      {getFullDateString(date)}
    </div>
  );
};

export default TaskDetails;
