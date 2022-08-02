import './index.scss';

import { FC, ReactElement, useRef, useState } from 'react';
import { BsTags } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import { useTask } from 'providers/task';
import TagMenu from 'routes/tasks/components/task/edit/sidebar/tags/menu';
import TaskTag from 'routes/tasks/components/task/edit/sidebar/tags/tag';

const TaskTags: FC = () => {
  const { id, tags } = useTask();
  const [showTagMenu, setShowTagMenu] = useState(false);
  const tagsRef = useRef(null);

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
      <div className='menu-container sidebar-menu-container task-sidebar-collapsable-container'>
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
    buttonStyle='icon'
    size='medium'
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
