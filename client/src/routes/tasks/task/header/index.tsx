import './index.scss';

import { FC, ReactElement } from 'react';
import {
  BsArchive, BsBookmarks, BsBookmarksFill, BsFlag, BsInbox, BsInboxes, BsLightning, BsTrash, BsTrophy,
} from 'react-icons/bs';

import { useTasks } from 'providers';
import ActionButton from 'routes/tasks/buttons/action';
import { STATUS_NAMES } from 'settings/task';

const { archived, blocked, completed, inProgress, toDo } = STATUS_NAMES;

interface IHeader {
  id: string,
  isArchived: boolean,
  isPinned: boolean,
  objective: string,
  status: Status,
};

const Header: FC<IHeader> = ({ id, isArchived, isPinned, objective, status }) => {
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
      <div className='task-pin'>
        {isPinned ? <BsBookmarksFill /> : <BsBookmarks />}
      </div>
      {getStatusIcon(status.name)}
      <b className='task-objective'>{objective}</b>
      <div className='action-menu'>
        <ActionButton
          action={() => archiveTaskById(id)}
          icon={<BsInboxes />}
          isDisabled={isArchived}
        />
        <ActionButton
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

export default Header;
