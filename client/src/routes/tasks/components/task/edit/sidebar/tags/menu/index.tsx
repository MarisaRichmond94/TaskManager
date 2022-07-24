import './index.scss';

import { FC, useState } from 'react';

import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import TaskTag from 'routes/tasks/components/task/edit/sidebar/tags/tag';

const TagMenu: FC = () => {
  const [isAddMenu, setIsAddMenu] = useState(true);

  return (
    <div id='tag-menu'>
      <Header isAddMenu={isAddMenu} setIsAddMenu={setIsAddMenu} />
      <div id='tag-menu-body'>
        {isAddMenu ? <AddMenu /> : <ManageMenu />}
      </div>
    </div>
  );
};

interface IHeader {
  isAddMenu: boolean,
  setIsAddMenu: (isAddMenu: boolean) => void,
};

const Header: FC<IHeader> = ({ isAddMenu, setIsAddMenu }) => (
  <div className='tag-menu-header'>
    <TMButton
      buttonStyle='underline'
      classNames={[isAddMenu ? 'active' : '']}
      size='medium'
      onClick={() => setIsAddMenu(true)}
    >
      Add
    </TMButton>
    <TMButton
      buttonStyle='underline'
      classNames={[isAddMenu ? '' : 'active']}
      size='medium'
      onClick={() => setIsAddMenu(false)}
    >
      Manage
    </TMButton>
  </div>
);

const AddMenu: FC = () => {
  const { tags: userTags } = useTasks();
  const { tags: taskTags } = useTask();

  const taskTagNames = taskTags.map(taskTag => taskTag.name);
  const unusedTags = userTags.filter(userTag => !taskTagNames.includes(userTag.name));

  const populateTaskTags = (tags: Tag[], isInUse: boolean) => {
    return tags.map(tag => {
      return (
        <TaskTag
          key={`tag-menu-tag-${tag.id}`}
          hexColor={tag.hexColor}
          isInUse={isInUse}
          name={tag.name}
        />
      )
    });
  };

  return (
    <div id='add-menu'>
      <div id='active-task-tags'>
        {populateTaskTags(taskTags, true)}
      </div>
      <hr />
      <div id='inactive-user-tags'>
        {populateTaskTags(unusedTags, false)}
      </div>
    </div>
  );
};

const ManageMenu: FC = () => {
  const { tags: userTags } = useTasks();
  const { tags: taskTags } = useTask();

  return (
    <div id='manage-menu'>

    </div>
  );
};

export default TagMenu;
