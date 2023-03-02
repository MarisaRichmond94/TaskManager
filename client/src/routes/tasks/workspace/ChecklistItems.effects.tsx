import { Dispatch, ReactElement, SetStateAction } from 'react';

import ChecklistItem from 'routes/tasks/workspace/ChecklistItem';

interface Args {
  isCreatingNewChecklistItem: boolean,
  setIsCreatingNewChecklistItem: Dispatch<SetStateAction<boolean>>,
  moveChecklistItem: (dragIndex: number, hoverIndex: number) => void,
  checklistItems?: ChecklistItem[],
};

const populateTaskChecklistItems = ({
  isCreatingNewChecklistItem,
  setIsCreatingNewChecklistItem,
  moveChecklistItem,
  checklistItems,
}: Args): ReactElement[] | ReactElement => {
  if (!isCreatingNewChecklistItem && !checklistItems.length) {
    return (
      <div className={['sub-header-text', 'no-checklist-items'].join(' ')}>
        No checklist items
      </div>
    );
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

  return [...uncompletedTasks, ...completedTasks].map((checklistItem, index) => {
    return (
      <ChecklistItem
        key={`task-checklist-item-${index}`}
        checklistItem={checklistItem}
        moveChecklistItem={moveChecklistItem}
        total={checklistItems.length}
        setIsCreatingNewChecklistItem={setIsCreatingNewChecklistItem}
      />
    );
  });
};

export {
  populateTaskChecklistItems,
};
