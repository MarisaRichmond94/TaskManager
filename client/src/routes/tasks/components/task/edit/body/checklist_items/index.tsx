import './index.scss';

import { FC, ReactElement, useState } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp, BsX } from 'react-icons/bs';
import { RiPlayListAddFill } from 'react-icons/ri';

import TMCheckbox from 'components/tm_button/tm_checkbox';
import TMEditableInput from 'components/tm_input/editable';
import TMCollapsableSection from 'components/tm_collapsable_section';
import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';
import TaskActionButton from '../../../action_button';

const TaskChecklistItems: FC = () => {
  const [isCreatingNewChecklistItem, setIsCreatingNewChecklistItem] = useState(false);
  const { checklistItems, id, createChecklistItem } =  useTask();
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

  const onCreateCallback = (description: string) => {
    if (description !== '') createChecklistItem({ taskId: id, description });
    setIsCreatingNewChecklistItem(false);
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'checklist-items-section']}
      id={`task-card-${id}-checklist-items`}
      initiallyVisible
      rightBlock={
        <AddChecklistItemButton enterCreateMode={() => setIsCreatingNewChecklistItem(true) } />
      }
      sectionTitle={`Checklist (${completed}/${total})`}
    >
      <div className='task-checklist-items-container task-sidebar-collapsable-container'>
        {populateTaskChecklistItems(checklistItems.sort())}
        {isCreatingNewChecklistItem && <NewChecklistItem onCreateCallback={onCreateCallback} />}
      </div>
    </TMCollapsableSection>
  );
};

interface IAddChecklistItemButton {
  enterCreateMode: () => void,
};

const AddChecklistItemButton: FC<IAddChecklistItemButton> = ({ enterCreateMode }) => (
  <TMButton
    classNames={['grey', 'add-checklist-item-button']}
    buttonStyle='icon'
    size='medium'
    onClick={enterCreateMode}
  >
    <RiPlayListAddFill />
  </TMButton>
);

interface INewChecklistItem {
  onCreateCallback: (description: string) => void,
};

const NewChecklistItem: FC<INewChecklistItem> = ({ onCreateCallback }) => {
  const textBlock = (
    <TMEditableInput
      autoFocus
      classNames={['sub-header-text', 'checklist-item-description']}
      currInputValue=''
      id={`new-checklist-item-description`}
      onUpdateCallback={onCreateCallback}
    />
  );

  return (
    <div className='checklist-item-row'>
      <TMCheckbox
        key={`new-checklist-item`}
        classNames={['task-checklist-item']}
        isActive={false}
        textBlock={textBlock}
        toggleIsActive={() => {}} // can't toggle a new checklist item active
      />
    </div>
  );
};

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
      <ChecklistItemActionMenu id={id} orderIndex={orderIndex} total={total} />
    </div>
  );
};

interface IChecklistItemActionMenu {
  id: string,
  orderIndex: number,
  total: number,
};

const ChecklistItemActionMenu: FC<IChecklistItemActionMenu> = ({ id, orderIndex, total }) => {
  const { deleteChecklistItem, updateChecklistItem } = useTask();

  return (
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
        action={() => deleteChecklistItem(id)}
        icon={<BsX />}
      />
    </div>
  );
};

const NoChecklistItemsToDisplay: FC = () => (
  <div className='sub-header-text no-checklist-items'>
    No checklist items
  </div>
);

export default TaskChecklistItems;
