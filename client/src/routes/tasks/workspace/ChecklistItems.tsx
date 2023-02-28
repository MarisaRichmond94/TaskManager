import './ChecklistItems.scss';

import { FC, useState } from 'react';
import { RiPlayListAddFill } from 'react-icons/ri';

import TMCheckbox from 'components/tm_checkbox';
import TMEditableField, { FieldType } from 'components/tm_editable_field';
import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import { useTask } from 'providers/task';
import { populateTaskChecklistItems } from 'routes/tasks/workspace/ChecklistItems.effects';

const ChecklistItems: FC = () => {
  const [isCreatingNewChecklistItem, setIsCreatingNewChecklistItem] = useState(false);
  const { checklistItems, id, createChecklistItem } =  useTask();
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;

  const onCreateCallback = (description: string) => {
    if (description !== '') createChecklistItem({ taskId: id, description });
    setIsCreatingNewChecklistItem(false);
  };

  const taskChecklistItems = populateTaskChecklistItems({
    isCreatingNewChecklistItem,
    setIsCreatingNewChecklistItem,
    checklistItems,
  });

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

interface AddChecklistItemButtonProps {
  enterCreateMode: () => void,
};

const AddChecklistItemButton: FC<AddChecklistItemButtonProps> = ({ enterCreateMode }) => (
  <TMButton
    classNames={['grey', 'add-checklist-item-button']}
    type={ButtonType.icon}
    size={ButtonSize.medium}
    onClick={enterCreateMode}
  >
    <RiPlayListAddFill />
  </TMButton>
);

interface NewChecklistItemProps {
  onCreateCallback: (description: string) => void,
};

const NewChecklistItem: FC<NewChecklistItemProps> = ({ onCreateCallback }) => {
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

export default ChecklistItems;
