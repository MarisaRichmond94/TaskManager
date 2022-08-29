import './index.scss';

import { FC } from 'react';

import TaskAttachments from 'routes/tasks/workspace/attachments';
import TaskDetails from 'routes/tasks/workspace/details';
import TaskDueDate from 'routes/tasks/workspace/due_date';
import TaskTags from 'routes/tasks/workspace/tags';

const Sidebar: FC = () => (
  <div className='workspace-sidebar'>
    <TaskDueDate />
    <TaskTags />
    <TaskAttachments />
    <TaskDetails />
  </div>
);

export default Sidebar;
