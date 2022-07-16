import './index.scss';

import { ReactElement } from 'react';
import { BsTags, BsX } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { useTasks } from 'providers/tasks';

interface TaskTagsProps {
  id: string,
  tags?: Tag[],
};

const TaskTags = ({ id, tags }: TaskTagsProps): ReactElement => {
  const { tags: userTags } = useTasks();

  const populateTaskTags = (taskTags?: Tag[]): ReactElement[] | ReactElement => {
    if (!taskTags.length) return <NoTagsToDisplay />;

    return taskTags.map((taskTag: Tag, index: number) => {
      return <TaskTag key={`task-tag-${index}`} name={taskTag.name} />;
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section']}
      id={`task-card-${id}-tags`}
      initiallyVisible
      rightBlock={<AddTagButton />}
      sectionTitle='Tags'
    >
      <div className='task-tag-container'>
        {populateTaskTags(tags)}
      </div>
    </TMCollapsableSection>
  );
};

interface TaskTagProps { name: string };

const TaskTag = ({ name }: TaskTagProps): ReactElement => (
  <div className='task-tag'>
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
    classNames={['grey']}
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
