import './index.scss';

import { ReactElement } from 'react';

import TaskAttachments from 'routes/tasks/components/task/edit/sidebar/attachments';
import TaskDetails from 'routes/tasks/components/task/edit/sidebar/details';
import TaskDueDate from 'routes/tasks/components/task/edit/sidebar/due_date';
import TaskTags from 'routes/tasks/components/task/edit/sidebar/tags';

interface SidebarProps {
  id: string,
  attachments?: Attachment[],
  createdAt: number,
  dueDate?: number,
  tags?: Tag[],
  updatedAt: number,
};

const Sidebar = ({
  id,
  attachments,
  createdAt,
  dueDate,
  tags,
  updatedAt,
}: SidebarProps): ReactElement => (
  <div className='tm-task-sidebar'>
    <TaskDueDate id={id} dueDate={dueDate} />
    <TaskTags id={id} tags={tags} />
    <TaskAttachments id={id} attachments={attachments} />
    <TaskDetails id={id} createdAt={createdAt} updatedAt={updatedAt} />
  </div>
);

export default Sidebar;
