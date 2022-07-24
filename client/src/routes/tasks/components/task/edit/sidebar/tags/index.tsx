import './index.scss';

import { FC, ReactElement } from 'react';
import { BsTags } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import TMCollapsableSection from 'components/tm_collapsable_section';
import { useTask } from 'providers/task';
import TagMenu from 'routes/tasks/components/task/edit/sidebar/tags/menu';
import TaskTag from 'routes/tasks/components/task/edit/sidebar/tags/tag';

const TaskTags: FC = () => {
  const { id, tags } = useTask();

  const populateTaskTags = (taskTags?: Tag[]): ReactElement[] | ReactElement => {
    if (!taskTags.length) return <NoTagsToDisplay />;

    return taskTags.map((taskTag: Tag, index: number) => {
      const { name, hexColor } = taskTag;
      return <TaskTag key={`task-tag-${index}`} name={name} hexColor={hexColor} />;
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'task-tags-section']}
      id={`task-card-${id}-tags`}
      initiallyVisible
      rightBlock={<AddTagButton />}
      sectionTitle='Tags'
    >
      <div className='task-tag-container task-sidebar-collapsable-container'>
        <TagMenu />
        {populateTaskTags(tags)}
      </div>
    </TMCollapsableSection>
  );
};

const AddTagButton = (): ReactElement => (
  <TMButton
    classNames={['grey', 'add-tag-button']}
    buttonStyle='icon'
    size='medium'
    onClick={() => console.log('add tag')}
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
