import './index.scss';

import { ReactElement } from 'react';

import TaskAttachments from 'routes/tasks/components/task/edit/sidebar/attachments';
import TaskDetails from 'routes/tasks/components/task/edit/sidebar/details';
import TaskTags from 'routes/tasks/components/task/edit/sidebar/tags';

interface SidebarProps {
  id: string,
  attachments?: Attachment[],
  createdAt: string,
  dueDate?: string,
  tags?: Tag[],
  updatedAt: string,
};

const Sidebar = ({
  id,
  attachments,
  createdAt,
  dueDate,
  tags,
  updatedAt,
}: SidebarProps): ReactElement => {
  return (
    <div className='tm-task-sidebar'>
      <TaskTags id={id} tags={tags} />
      <TaskAttachments id={id} attachments={attachments} />
      <TaskDetails id={id} createdAt={createdAt} dueDate={dueDate} updatedAt={updatedAt} />
    </div>
  );
};

export default Sidebar;
