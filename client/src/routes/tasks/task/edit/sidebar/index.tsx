import './index.scss';

import { FC } from 'react';

import TaskAttachments from 'routes/tasks/task/edit/sidebar/attachments';
import TaskDetails from 'routes/tasks/task/edit/sidebar/details';
import TaskDueDate from 'routes/tasks/task/edit/sidebar/due_date';
import TaskTags from 'routes/tasks/task/edit/sidebar/tags';

const Sidebar: FC = () => (
  <div className='tm-task-sidebar'>
    <TaskDueDate />
    <TaskTags />
    <TaskAttachments />
    <TaskDetails />
  </div>
);

export default Sidebar;
