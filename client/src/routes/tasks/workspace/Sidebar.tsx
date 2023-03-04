import './Sidebar.scss';

import { FC } from 'react';

import { Details, DueDate, TaskAttachments, TaskTags } from 'routes/tasks';

const Sidebar: FC = () => (
  <div className='workspace-sidebar'>
    <DueDate />
    <TaskTags />
    <TaskAttachments />
    <Details />
  </div>
);

export default Sidebar;
