import './index.scss';

import { FC, ReactElement } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp, BsX } from 'react-icons/bs';
import { RiPlayListAddFill } from 'react-icons/ri';

import TMCheckbox from 'components/tm_button/tm_checkbox';
import TMEditableInput from 'components/tm_input/editable';
import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';
import TaskActionButton from '../../../action_button';

const TaskChecklistItems: FC = () => {
  const { checklistItems, id } =  useTask();
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;

  const populateTaskChecklistItems = (
    taskChecklistItems?: ChecklistItem[]
  ): ReactElement[] | ReactElement => {
    if (!taskChecklistItems.length) return <NoChecklistItemsToDisplay />;

    taskChecklistItems.sort(
      (a,b) => (a.orderIndex > b.orderIndex) ? 1 : ((b.orderIndex > a.orderIndex) ? -1 : 0)
    );
    return taskChecklistItems.map((checklistItem, index) => {
      return (
        <TaskChecklistItem
          key={`task-checklist-item-${index}`}
          checklistItem={checklistItem}
          total={checklistItems.length}
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
  total: number,
};

const TaskChecklistItem: FC<IChecklistItem> = ({ checklistItem, total }) => {
  const { updateChecklistItem } = useTask();
  const { id, description, isCompleted, orderIndex } = checklistItem;

  const textBlock = (
    <TMEditableInput
      classNames={['sub-header-text', 'checklist-item-description']}
      currInputValue={description}
      id={`checklist-item-description-${id}`}
      onUpdateCallback={(description: string) => updateChecklistItem(id, { description })}
    />
  );

  return (
    <div className='checklist-item-row'>
      <TMCheckbox
        key={`task-checklist-item-${id}`}
        classNames={['task-checklist-item']}
        isActive={isCompleted}
        textBlock={textBlock}
        toggleIsActive={() => updateChecklistItem(id, { isCompleted: !isCompleted })}
      />
      <div className='checklist-item-action-menu'>
        <TaskActionButton
          action={() => updateChecklistItem(id, { orderIndex: orderIndex - 1})}
          icon={<BsChevronDoubleUp />}
          isDisabled={orderIndex === 0}
        />
        <TaskActionButton
          action={() => updateChecklistItem(id, { orderIndex: orderIndex + 1})}
          icon={<BsChevronDoubleDown />}
          isDisabled={orderIndex === (total - 1)}
        />
        <TaskActionButton
          action={() => console.log('delete')}
          icon={<BsX />}
        />
      </div>
    </div>
  );
};

const NoChecklistItemsToDisplay: FC = () => (
  <div className='sub-header-text no-checklist-items'>
    No checklist items
  </div>
);

export default TaskChecklistItems;
