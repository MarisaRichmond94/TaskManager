import './index.scss';

import { FC, ReactElement } from 'react';
import { RiPlayListAddFill } from 'react-icons/ri';

import TMCheckbox from 'components/tm_button/tm_checkbox';
import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { TMButton } from 'components/tm_button';

interface ITaskChecklistItems {
  id: string,
  checklistItems?: ChecklistItem[],
};

const TaskChecklistItems: FC<ITaskChecklistItems> = ({ id, checklistItems }) => {
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;

  const populateTaskChecklistItems = (
    taskChecklistItems?: ChecklistItem[]
  ): ReactElement[] | ReactElement => {
    if (!taskChecklistItems.length) return <NoChecklistItemsToDisplay />;

    return taskChecklistItems.map((checklistItem, index) => {
      return (
        <TaskChecklistItem
          key={`task-checklist-item-${index}`}
          checklistItem={checklistItem}
        />
      );
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'checklist-items-section']}
      id={`task-card-${id}-checklist-items`}
      initiallyVisible
      rightBlock={<AddChecklistItemButton />}
      sectionTitle={`Checklist (${completed}/${total})`}
    >
      <div className='task-checklist-items-container task-sidebar-collapsable-container'>
        {populateTaskChecklistItems(checklistItems.sort())}
      </div>
    </TMCollapsableSection>
  );
};

const AddChecklistItemButton: FC = () => (
  <TMButton
    classNames={['grey', 'add-checklist-item-button']}
    buttonStyle='icon'
    size='medium'
    onClick={() => console.log('add checklist item')}
  >
    <RiPlayListAddFill />
  </TMButton>
);

interface IChecklistItem {
  checklistItem: ChecklistItem,
};

const TaskChecklistItem: FC<IChecklistItem> = ({ checklistItem }) => {
  const { id, description, isCompleted } = checklistItem;

  return (
    <TMCheckbox
      key={`task-checklist-item-${id}`}
      classNames={['task-checklist-item']}
      isActive={isCompleted}
      text={description}
      toggleIsActive={() => console.log('add toggle functionality')}
    />
  );
};

const NoChecklistItemsToDisplay: FC = () => (
  <div className='sub-header-text no-checklist-items'>
    No checklist items
  </div>
);

export default TaskChecklistItems;
