import './index.scss';

import { FC, ReactElement } from 'react';
import { BsTags, BsX } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { useTasks } from 'providers/tasks';

interface ITaskTags {
  id: string,
  tags?: Tag[],
};

const TaskTags: FC<ITaskTags> = ({ id, tags }) => {
  const { tags: userTags } = useTasks();

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
        {populateTaskTags(tags)}
      </div>
    </TMCollapsableSection>
  );
};

interface TaskTagProps { name: string, hexColor: string };

const TaskTag = ({ name, hexColor }: TaskTagProps): ReactElement => (
  <div className='task-tag' style={{ backgroundColor: hexColor }}>
    <div className='sub-header-text'>{name}</div>
    <TMButton
      buttonStyle='icon'
      size='medium'
      onClick={() => console.log('delete tag')}
    >
      <BsX />
    </TMButton>
  </div>
);

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
