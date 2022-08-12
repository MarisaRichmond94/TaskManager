import './index.scss';

import { FC, ReactElement, useEffect, useRef } from 'react';
import {
  BsArchive, BsCalendarDate, BsChatSquareText, BsCardChecklist, BsFlag,
  BsInbox, BsInboxes, BsLightning, BsTags, BsTrash, BsTrophy,
} from 'react-icons/bs';

import { useTasks } from 'providers/tasks';
import TaskActionButton from 'routes/tasks/task/action_button';
import { ARCHIVED_TASK_STATUS_NAMES, TASK_STATUS_NAMES } from 'settings';
import { getDayMonthDateString, toClientDatetime } from 'utils/date';

const { archived, blocked, completed, inProgress, toDo } = TASK_STATUS_NAMES;

interface ITaskCard {
  task: Task,
};

const TaskCard: FC<ITaskCard> = ({ task }) => {
  const { activeTaskId, updateActiveTaskId } = useTasks();
  const taskRef = useRef(null);
  const { id, objective, status } = task;
  const { description } = task;
  const { checklistItems, comments, dueDate, tags } = task;
  const isActiveTask = activeTaskId === id;
  const isArchived = ARCHIVED_TASK_STATUS_NAMES.includes(status.name);

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

interface IHeader {
  id: string,
  isArchived: boolean,
  objective: string,
  status: Status,
};

const Header: FC<IHeader> = ({ id, isArchived, objective, status }) => {
  const { archiveTaskById, deleteTaskById } = useTasks();

  const getStatusIcon = (statusName: string): ReactElement => {
    switch (statusName) {
      case toDo: return <BsInbox className={toDo.toLowerCase().split(' ').join('-')} />;
      case inProgress: return <BsLightning className={inProgress.toLowerCase().split(' ').join('-')} />;
      case blocked: return <BsFlag className={blocked.toLowerCase()} />;
      case completed: return <BsTrophy className={completed.toLowerCase()} />;
      case archived: return <BsArchive className={archived.toLowerCase()} />;
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
          action={
            (e: any) => {
              e.stopPropagation(); // prevents activeTaskId from being updated by top-level onClick
              deleteTaskById(id);
            }
          }
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

interface IFooter {
  checklistItems: ChecklistItem[],
  comments: Comment[],
  dueDate: number,
  tags: Tag[],
};

const Footer: FC<IFooter> = ({ checklistItems, comments, dueDate, tags }) => {
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

interface IFooterStat {
  icon: ReactElement,
  stat: string,
};

const FooterStat: FC<IFooterStat> = ({ icon, stat }) => (
  <div className='footer-stat'>
    {icon}
    {stat}
  </div>
);

export default TaskCard;
