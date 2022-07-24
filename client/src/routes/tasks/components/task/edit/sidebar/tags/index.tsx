import './index.scss';

import { FC, ReactElement, useState } from 'react';
import { BsTags } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import TMCollapsableSection from 'components/tm_collapsable_section';
import { useTask } from 'providers/task';
import TagMenu from 'routes/tasks/components/task/edit/sidebar/tags/menu';
import TaskTag from 'routes/tasks/components/task/edit/sidebar/tags/tag';

const TaskTags: FC = () => {
  const { id, tags } = useTask();
  const [showTagMenu, setShowTagMenu] = useState(false);

  const populateTaskTags = (taskTags?: Tag[]): ReactElement[] | ReactElement => {
    if (!taskTags.length) return <NoTagsToDisplay />;

    return taskTags.map((taskTag: Tag, index: number) => {
      const { id, hexColor, name, tagId } = taskTag;
      const key = `task-tag-${index}`;
      return <TaskTag key={key} id={id} hexColor={hexColor} name={name} tagId={tagId} />;
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'task-tags-section']}
      id={`task-card-${id}-tags`}
      initiallyVisible
      rightBlock={
        <ToggleTagMenuButton showTagMenu={showTagMenu} setShowTagMenu={setShowTagMenu} />
      }
      sectionTitle='Tags'
    >
      <div className='task-tag-container task-sidebar-collapsable-container'>
        {showTagMenu && <TagMenu />}
        {populateTaskTags(tags)}
      </div>
    </TMCollapsableSection>
  );
};

interface IToggleTagMenuButton {
  showTagMenu: boolean,
  setShowTagMenu: (showTagMenu: boolean) => void,
};

const ToggleTagMenuButton: FC<IToggleTagMenuButton> = ({ showTagMenu, setShowTagMenu }) => (
  <TMButton
    classNames={showTagMenu ? ['red', 'active', 'add-tag-button'] : ['grey', 'add-tag-button']}
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
