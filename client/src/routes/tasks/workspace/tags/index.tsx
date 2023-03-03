import './index.scss';

import { FC, ReactElement, useRef, useState } from 'react';
import { BsTags } from 'react-icons/bs';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { useTask } from 'providers';
import TagMenu from 'routes/tasks/workspace/tag_menu';
import TaskTag from 'routes/tasks/workspace/tag';

const TaskTags: FC = () => {
  const { id, tags } = useTask();
  const [showTagMenu, setShowTagMenu] = useState(false);
  const tagsRef = useRef(null);
  useOnClickOutside(tagsRef, () => setShowTagMenu(false));

  const populateTaskTags = (taskTags?: Tag[]): ReactElement[] | ReactElement => {
    if (!taskTags.length) return <NoTagsToDisplay />;

    return taskTags.map((taskTag: Tag, index: number) => {
      const { id, hexColor, name, tagId } = taskTag;
      const key = `task-tag-${index}`;
      return <TaskTag key={key} id={id} hexColor={hexColor} name={name} tagId={tagId} />;
    });
  };

  return (
    <TMControlledCollapsableSection
      classNames={['off-black', 'task-section', 'task-tags-section', 'task-sidebar-section']}
      id={`task-card-${id}-tags`}
      initiallyVisible
      onToggleCallback={() => setShowTagMenu(false)}
      reference={tagsRef}
      rightBlock={
        <ToggleTagMenuButton showTagMenu={showTagMenu} setShowTagMenu={setShowTagMenu} />
      }
      sectionTitle='Tags'
    >
      <div
        className='menu-container sidebar-menu-container task-sidebar-collapsable-container'
        id='task-tag-menu-container'
      >
        {
          showTagMenu &&
          <TagMenu
            onCloseCallback={() => setShowTagMenu(false)}
            reference={tagsRef}
            style={{ height: `${(tags.length * 60) + 10}px` }}
          />
        }
        {populateTaskTags(tags)}
      </div>
    </TMControlledCollapsableSection>
  );
};

interface IToggleTagMenuButton {
  showTagMenu: boolean,
  setShowTagMenu: (showTagMenu: boolean) => void,
};

const ToggleTagMenuButton: FC<IToggleTagMenuButton> = ({ showTagMenu, setShowTagMenu }) => (
  <TMButton
    classNames={['grey', 'toggle-menu-button', showTagMenu ? 'active' : '']}
    type={ButtonType.icon}
    size={ButtonSize.medium}
    onClick={() => setShowTagMenu(!showTagMenu)}
  >
    <BsTags />
  </TMButton>
);

const NoTagsToDisplay = (): ReactElement => (
  <div className='no-tags sub-header-text'>
    No tags
  </div>
);

export default TaskTags;
