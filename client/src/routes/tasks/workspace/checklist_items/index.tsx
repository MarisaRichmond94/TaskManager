import './index.scss';

import { Dispatch, FC, ReactElement, SetStateAction, useCallback, useState } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp, BsX } from 'react-icons/bs';
import { RiPlayListAddFill } from 'react-icons/ri';

import TMCheckbox from 'components/tm_checkbox';
import TMEditableField from 'components/tm_editable_field';
import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import { useTask } from 'providers/task';
import ActionButton from 'routes/tasks/buttons/action';
import { FieldType } from 'types/constants/tm_editable_field';

const TaskChecklistItems: FC = () => {
  const [isCreatingNewChecklistItem, setIsCreatingNewChecklistItem] = useState(false);
  const { checklistItems, id, createChecklistItem } =  useTask();
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;

  const populateTaskChecklistItems = (
    isCreatingNewChecklistItem: boolean = false,
    setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
    taskChecklistItems?: ChecklistItem[],
  ): ReactElement[] | ReactElement => {
    if (!isCreatingNewChecklistItem && !taskChecklistItems.length) {
      return <NoChecklistItemsToDisplay />;
    }

    taskChecklistItems.sort(
      (a,b) => (a.orderIndex > b.orderIndex) ? 1 : ((b.orderIndex > a.orderIndex) ? -1 : 0)
    );

    return taskChecklistItems.map((checklistItem, index) => {
      return (
        <TaskChecklistItem
          key={`task-checklist-item-${index}`}
          checklistItem={checklistItem}
          total={checklistItems.length}
          setIsCreatingNewChecklistItem={setIsCreatingNewChecklistItem}
        />
      );
    });
  };

  const onCreateCallback = (description: string) => {
    if (description !== '') createChecklistItem({ taskId: id, description });
    setIsCreatingNewChecklistItem(false);
  };

  const taskChecklistItems = populateTaskChecklistItems(
    isCreatingNewChecklistItem,
    setIsCreatingNewChecklistItem,
    checklistItems.sort(),
  );

  return (
    <TMControlledCollapsableSection
      classNames={['off-black', 'task-section', 'checklist-items-section']}
      id={`task-card-${id}-checklist-items`}
      initiallyVisible
      rightBlock={
        <AddChecklistItemButton enterCreateMode={() => setIsCreatingNewChecklistItem(true) } />
      }
      sectionTitle={`Checklist (${completed}/${total})`}
    >
      <div className={['task-checklist-items-container', 'task-sidebar-collapsable-container'].join(' ')}>
        {taskChecklistItems}
        {
          isCreatingNewChecklistItem &&
          <NewChecklistItem onCreateCallback={onCreateCallback} />
        }
      </div>
    </TMControlledCollapsableSection>
  );
};

interface IAddChecklistItemButton {
  enterCreateMode: () => void,
};

const AddChecklistItemButton: FC<IAddChecklistItemButton> = ({ enterCreateMode }) => (
  <TMButton
    classNames={['grey', 'add-checklist-item-button']}
    buttonStyle={ButtonStyle.icon}
    size={ButtonSize.medium}
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
    <TMEditableField
      autoFocus
      classNames={['sub-header-text', 'checklist-item-description']}
      fieldType={FieldType.plainText}
      initialValue=''
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
  setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
};

const TaskChecklistItem: FC<IChecklistItem> = ({
  checklistItem,
  total,
  setIsCreatingNewChecklistItem,
}) => {
  const { updateChecklistItem } = useTask();
  const { id, description, isCompleted, orderIndex } = checklistItem;

  const onUpdateCallback = useCallback((description: string) => {
    updateChecklistItem(id, { description });
    setIsCreatingNewChecklistItem(true);
  }, [id, setIsCreatingNewChecklistItem, updateChecklistItem]);

  const textBlock = (
    <TMEditableField
      classNames={['sub-header-text', 'checklist-item-description']}
      fieldType={FieldType.plainText}
      initialValue={description}
      onUpdateCallback={onUpdateCallback}
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
      <ActionButton
        action={() => updateChecklistItem(id, { orderIndex: orderIndex - 1})}
        icon={<BsChevronDoubleUp />}
        isDisabled={orderIndex === 0}
      />
      <ActionButton
        action={() => updateChecklistItem(id, { orderIndex: orderIndex + 1})}
        icon={<BsChevronDoubleDown />}
        isDisabled={orderIndex === (total - 1)}
      />
      <ActionButton
        action={() => deleteChecklistItem(id)}
        icon={<BsX />}
      />
    </div>
  );
};

const NoChecklistItemsToDisplay: FC = () => (
  <div className={['sub-header-text', 'no-checklist-items'].join(' ')}>
    No checklist items
  </div>
);

export default TaskChecklistItems;
