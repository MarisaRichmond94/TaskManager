import './ChecklistItem.scss';

import { Dispatch, FC, SetStateAction, useCallback, useRef } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp, BsX } from 'react-icons/bs';

import TMCheckbox from 'components/tm_checkbox';
import TMEditableField, { FieldType } from 'components/tm_editable_field';
import { useTask } from 'providers/task';
import ActionButton from 'routes/tasks/buttons/action';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

const ItemTypes = { CHECKLIST_ITEM: 'checklistItem' };

interface DragItem {
  index: number,
  id: string,
  type: string,
};

interface ChecklistItemProps {
  checklistItem: ChecklistItem,
  total: number,
  moveChecklistItem: (dragIndex: number, hoverIndex: number) => void,
  setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
};

const ChecklistItem: FC<ChecklistItemProps> = ({
  checklistItem,
  total,
  moveChecklistItem,
  setIsCreatingNewChecklistItem,
}) => {
  const { updateChecklistItem } = useTask();
  const { id, description, isCompleted, orderIndex } = checklistItem;

  const ref = useRef<HTMLDivElement>(null);
  const [{ canDrop, handlerId, isOver }, drop] = useDrop({
    accept: ItemTypes.CHECKLIST_ITEM,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
    }),
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = orderIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveChecklistItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // eslint-disable-next-line no-empty-pattern
  const [{}, drag] = useDrag({
    type: ItemTypes.CHECKLIST_ITEM,
    item: () => ({ id, orderIndex }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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

  drag(drop(ref));

  return (
    <div
      className={['checklist-item-row', canDrop && isOver ? 'hovered' : ''].join(' ')}
      ref={ref}
      data-handler-id={handlerId}
    >
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

export default ChecklistItem;
