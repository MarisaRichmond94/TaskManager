import './index.scss';

import { FC, ReactElement } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdOutlineAddTask } from 'react-icons/md';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { getFullDateString, toClientDatetime } from 'utils/date';

interface ITaskDetails {
  id: string,
  createdAt: number,
  updatedAt: number,
};

const TaskDetails: FC<ITaskDetails> = ({ id, createdAt, updatedAt }) => {
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

interface ITaskDetail {
  secondsSinceEpoch: number,
  icon: ReactElement,
};

const TaskDetail: FC<ITaskDetail> = ({ secondsSinceEpoch, icon }) => {
  const date = toClientDatetime(secondsSinceEpoch);
  return (
    <div className='sub-header-text task-detail'>
      {icon}
      {getFullDateString(date)}
    </div>
  );
};

export default TaskDetails;
