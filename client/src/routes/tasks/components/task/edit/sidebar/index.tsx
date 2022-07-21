import './index.scss';

import { FC } from 'react';

import TaskAttachments from 'routes/tasks/components/task/edit/sidebar/attachments';
import TaskDetails from 'routes/tasks/components/task/edit/sidebar/details';
import TaskDueDate from 'routes/tasks/components/task/edit/sidebar/due_date';
import TaskTags from 'routes/tasks/components/task/edit/sidebar/tags';

const Sidebar: FC = () => (
  <div className='tm-task-sidebar'>
    <TaskDueDate />
    <TaskTags />
    <TaskAttachments />
    <TaskDetails />
  </div>
);

export default Sidebar;
