import './CreateModal.scss';

import { FC, useCallback, useState } from 'react';

import TMButton, { ButtonSize } from 'components/tm_button';
import TMDropdown from 'components/tm_dropdown';
import TMInput from 'components/tm_input';
import { useTasks } from 'providers';

type OptionalString = string | undefined;
type OptionalTaskTemplate = TaskTemplate | undefined;

interface CreateTaskModalProps {
  onCancelCallback: () => void,
};

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onCancelCallback }) => {
  const { taskTemplates, createTask } = useTasks();

  const [objective, setObjective] = useState<OptionalString>();
  const [taskTemplate, setTaskTemplate] = useState<OptionalTaskTemplate>();
  const [initialLink, setInitialLink] = useState<OptionalString>();

  const taskTemplateValid = !!taskTemplate ? !!(taskTemplate && initialLink) : true;
  const isCreateEnabled = !!objective && taskTemplateValid;
  const attachmentTypeName = taskTemplate?.attachmentType?.name;

  const onObjectiveChangeCallback = useCallback((updatedObjective: string) => {
    setObjective(updatedObjective);
  }, []);

  const onTaskTemplateChangeCallback = useCallback((selectedTaskTemplate: DropdownOption) => {
    setTaskTemplate(taskTemplates.find(x => x.type === selectedTaskTemplate.displayName));
  }, [taskTemplates]);

  const onInitialLinkChangeCallback = useCallback((updatedInitialLink: OptionalString) => {
    setInitialLink(updatedInitialLink);
  }, []);

  const createTaskCallback = useCallback(() => {
    createTask({
      dueDate: 0,
      link: initialLink,
      objective,
      taskTemplate,
    });
    onCancelCallback();
  }, [initialLink, objective, taskTemplate, createTask, onCancelCallback]);

  return (
    <div className='tm-modal' id='create-task-modal'>
      <div className='tm-modal-header'>
        <p><b>Create New Task</b></p>
        <hr className={['divider', 'primary-blue'].join(' ')} />
      </div>
      <div className='tm-modal-content'>
        <TMInput
          classNames={['create-task-input']}
          formValue={objective ?? ''}
          onChangeCallback={onObjectiveChangeCallback}
          placeholder='What needs to be done?'
        />
        <TMDropdown
          classNames={['create-task-input', 'white']}
          options={taskTemplates.map(({ id, type: displayName }) => {
            return { id, displayName };
          })}
          placeholder='Select task template (optional)'
          selectedOption={
            !!taskTemplate
              ? { id: taskTemplate.id, displayName: taskTemplate.type }
              : undefined
          }
          onOptionSelect={onTaskTemplateChangeCallback}
        />
        <TMInput
          classNames={['create-task-input']}
          formValue={initialLink ?? ''}
          onChangeCallback={onInitialLinkChangeCallback}
          placeholder={!!attachmentTypeName ? `${attachmentTypeName} Link` : 'Initial Link (optional)'}
        />
      </div>
      <div className='tm-modal-footer'>
        <TMButton classNames={['grey']} onClick={onCancelCallback} size={ButtonSize.small}>
          Cancel
        </TMButton>
        <TMButton
          classNames={['blue']}
          isDisabled={!isCreateEnabled}
          onClick={createTaskCallback}
          size={ButtonSize.small}
        >
          Create Task
        </TMButton>
      </div>
    </div>
  );
};

export default CreateTaskModal;
