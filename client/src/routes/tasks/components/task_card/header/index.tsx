import './index.scss';

import { ReactElement } from 'react';
import { BsBookmarks, BsBookmarksFill, BsCalendarMonth, BsInboxes, BsXLg } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import TMDropdown from 'components/tm_dropdown';
import { useTasks } from 'providers/tasks';

interface HeaderProps {
  isPinned: boolean,
  status: Status,
};

const BUTTON_CLASSES = ['off-black'];
const BUTTON_STYLE = 'icon';
const BUTTON_SIZE = 'medium';

const Header = ({ isPinned, status }: HeaderProps): ReactElement => {
  const { statusTypes } = useTasks();

  return (
    <div className='tm-task-header'>
      <TMDropdown
        onOptionSelect={(option: DropdownOption) => console.log(option.displayName)}
        options={statusTypes.map(s => { return { id: s.id, displayName: s.name } })}
        selectedOption={{ id: status.id, displayName: status.name }}
      />
      <div className='tm-task-menu'>
        <TMButton
          buttonStyle={BUTTON_STYLE}
          classNames={BUTTON_CLASSES}
          onClick={() => console.log('this should show a datepicker')}
          size={BUTTON_SIZE}
        >
          <BsCalendarMonth />
        </TMButton>
        <TMButton
          buttonStyle={BUTTON_STYLE}
          classNames={BUTTON_CLASSES}
          onClick={() => console.log('this should toggle is pinned')}
          size={BUTTON_SIZE}
        >
          {isPinned ? <BsBookmarksFill /> : <BsBookmarks />}
        </TMButton>
        <TMButton
          buttonStyle={BUTTON_STYLE}
          classNames={BUTTON_CLASSES}
          onClick={() => console.log('this should archive/delete a task')}
          size={BUTTON_SIZE}
        >
          <BsInboxes />
        </TMButton>
        <TMButton
          buttonStyle={BUTTON_STYLE}
          classNames={BUTTON_CLASSES}
          onClick={() => console.log('this should exit task view')}
          size={BUTTON_SIZE}
        >
          <BsXLg />
        </TMButton>
      </div>
    </div>
  );
};

export default Header;
