import { Dispatch, FC, ReactElement, SetStateAction, useCallback } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp, BsX } from 'react-icons/bs';

import TMCheckbox from 'components/tm_checkbox';
import TMEditableField, { FieldType } from 'components/tm_editable_field';
import { useTask } from 'providers/task';
import ActionButton from 'routes/tasks/buttons/action';

interface Args {
  isCreatingNewChecklistItem: boolean,
  setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
  checklistItems?: ChecklistItem[],
};

const populateTaskChecklistItems = ({
  isCreatingNewChecklistItem,
  setIsCreatingNewChecklistItem,
  checklistItems,
}: Args): ReactElement[] | ReactElement => {
  if (!isCreatingNewChecklistItem && !checklistItems.length) {
    return <NoChecklistItemsToDisplay />;
  }

  const uncompletedTasks = checklistItems
    .filter(x => !x.isCompleted)
    .sort((a, b) => (a.orderIndex > b.orderIndex)
      ? 1
      : ((b.orderIndex > a.orderIndex) ? -1 : 0)
    );
  const completedTasks = checklistItems
    .filter(x => x.isCompleted)
    .sort((a, b) => (a.updatedAt > b.updatedAt)
      ? 1
      : ((b.updatedAt > a.updatedAt) ? -1 : 0)
    );
  checklistItems = [...uncompletedTasks, ...completedTasks];

  return checklistItems.map((checklistItem, index) => {
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

const NoChecklistItemsToDisplay: FC = () => (
  <div className={['sub-header-text', 'no-checklist-items'].join(' ')}>
    No checklist items
  </div>
);

interface ChecklistItemProps {
  checklistItem: ChecklistItem,
  total: number,
  setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
};

const TaskChecklistItem: FC<ChecklistItemProps> = ({
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

interface ChecklistItemActionMenuProps {
  id: string,
  orderIndex: number,
  total: number,
};

const ChecklistItemActionMenu: FC<ChecklistItemActionMenuProps> = ({ id, orderIndex, total }) => {
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

export {
  populateTaskChecklistItems,
};
