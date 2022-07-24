import './index.scss';

import { FC, ReactElement, useEffect, useRef } from 'react';
import {
  BsCalendarDate, BsChatSquareText, BsCardChecklist, BsFlag,
  BsInbox, BsInboxes, BsLightning, BsTags, BsTrash, BsTrophy,
} from 'react-icons/bs';

import { useTasks } from 'providers/tasks';
import TaskActionButton from 'routes/tasks/components/task/action_button';
import { getDayMonthDateString, toClientDatetime } from 'utils/date';

interface ITaskCard {
  task: Task,
};

const TaskCard: FC<ITaskCard> = ({ task }) => {
  const { activeTaskId, updateActiveTaskId } = useTasks();
  const taskRef = useRef(null);
  const { id, isArchived, objective, status } = task;
  const { description } = task;
  const { checklistItems, comments, dueDate, tags } = task;
  const isActiveTask = activeTaskId === id;

  useEffect(() => {
    if (isActiveTask && taskRef.current) {
      taskRef.current.scrollIntoView();
    }
  }, [isActiveTask, taskRef]);

  return (
    <div
      className={['task-card', isActiveTask ? 'active' : ''].join(' ')}
      onClick={() => updateActiveTaskId(id)}
      ref={taskRef}
    >
      <Header id={id} isArchived={isArchived} objective={objective} status={status} />
      <Body description={description} />
      <Footer checklistItems={checklistItems} comments={comments} dueDate={dueDate} tags={tags} />
    </div>
  );
};

interface HeaderProps {
  id: string,
  isArchived: boolean,
  objective: string,
  status: Status,
};

const Header = ({ id, isArchived, objective, status }: HeaderProps): ReactElement => {
  const { archiveTaskById, deleteTaskById } = useTasks();

  const getStatusIcon = (statusName: string): ReactElement => {
    switch (statusName) {
      case 'To Do': return <BsInbox className='to-do' />;
      case 'In Progress': return <BsLightning className='in-progress' />;
      case 'Blocked': return <BsFlag className='blocked' />;
      case 'Complete': return <BsTrophy className='complete' />;
      default: throw Error(`Invalid status name ${statusName}`);
    }
  };

  return (
    <div className={['task-card-header', 'header-text'].join(' ')}>
      {getStatusIcon(status.name)}
      <b className='task-objective'>{objective}</b>
      <div className='action-menu'>
        <TaskActionButton
          action={() => archiveTaskById(id)}
          icon={<BsInboxes />}
          isDisabled={isArchived}
        />
        <TaskActionButton
          action={() => deleteTaskById(id)}
          icon={<BsTrash />}
        />
      </div>
    </div>
  );
};

const Body = ({ description } : { description: string }): ReactElement => (
  <div className='task-card-body sub-header-text'>
    {description}
  </div>
);

interface FooterProps {
  checklistItems: ChecklistItem[],
  comments: Comment[],
  dueDate: number,
  tags: Tag[],
};

const Footer = ({ checklistItems, comments, dueDate, tags } : FooterProps): ReactElement => {
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;
  const date = toClientDatetime(dueDate);

  return (
    <div className='task-card-footer sub-header-text'>
      <FooterStat icon={<BsCardChecklist />} stat={`${completed}/${total}`} />
      <FooterStat icon={<BsChatSquareText />} stat={comments.length.toString()} />
      <FooterStat icon={<BsTags />} stat={tags.length.toString()} />
      <FooterStat icon={<BsCalendarDate />} stat={getDayMonthDateString(date)} />
    </div>
  );
};

interface FooterStatProps {
  icon: ReactElement,
  stat: string,
};

const FooterStat = ({ icon, stat }: FooterStatProps): ReactElement => (
  <div className='footer-stat'>
    {icon}
    {stat}
  </div>
);

export default TaskCard;
