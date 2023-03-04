import './AttachmentMenu.scss';

import { FC, MutableRefObject, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

import TMDropdown from 'components/tm_dropdown';
import TMInput from 'components/tm_input';
import { useKeyPress, useOnClickOutside } from 'hooks';
import { useTask, useTasks } from 'providers';
import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';

interface AttachmentMenuProps {
  attachment?: UpdateAttachmentDTO,
  attachmentsRef: MutableRefObject<any>,
  cancelKey?: string,
  deleteKey?: string,
  submitKey?: string,
  onCancelCallback: () => void,
  onDeleteCallback: () => void,
  onUpdateCallback: (updatedAttachment: CreateAttachmentDTO | UpdateAttachmentDTO) => void,
};

const AttachmentMenu: FC<AttachmentMenuProps> = ({
  attachment,
  attachmentsRef,
  cancelKey = 'Escape',
  onCancelCallback,
  onDeleteCallback,
  onUpdateCallback,
}) => {
  const { id: taskId } = useTask();
  const { attachmentTypes } = useTasks();
  useOnClickOutside(attachmentsRef, () => onCancelCallback());

  const [type, setType] = useState<AttachmentType | undefined>(
    attachmentTypes.find(x => x.id === attachment?.attachmentTypeId)
  );
  const [link, setLink] = useState(attachment?.link || '');
  const [name, setName] = useState(attachment?.name || '');

  const isCancelKeyPressed = useKeyPress(cancelKey);

  const cancel = () => { onCancelCallback(); };
  const remove = () => { onDeleteCallback(); };

  const submit = () => {
    const dto = { attachmentTypeId: type?.id, link, name: name || `${type?.name} Link`, taskId };
    if (type?.id && link) {
      if (attachment) delete dto.taskId;
      onUpdateCallback(dto);
    }
  };

  if (isCancelKeyPressed) cancel();

  return (
    <div className='menu sidebar-menu'>
      <TypeSelector type={type} setType={setType} />
      <LinkInput link={link} setLink={setLink} />
      <NameInput name={name} setName={setName} />
      <div className='action-container'>
        <CancelButton onCancelCallback={onCancelCallback} />
        {!!attachment && <DeleteButton onDeleteCallback={remove} />}
        <SubmitButton
          isDisabled={!type?.id || !link}
          isExistingAttachment={!!attachment}
          onSubmitCallback={submit}
        />
      </div>
    </div>
  );
};

interface TypeSelectorProps {
  type: AttachmentType,
  setType: (updatedType: AttachmentType) => void,
};

const TypeSelector: FC<TypeSelectorProps> = ({ type, setType }) => {
  const { attachmentTypes: types } = useTasks();

  return (
    <TMDropdown
      classNames={['attachment-type-selector', 'white']}
      onOptionSelect={(option: DropdownOption) => setType(types.find(x => x.id === option.id))}
      options={types.map(x => { return { id: x.id, displayName: x.name }; })}
      placeholder='type (required)'
      selectedOption={type ? { id: type.id, displayName: type.name } : undefined}
    />
  );
};

interface LinkInputProps {
  link: string,
  setLink: (updatedLink: string) => void,
};

const LinkInput: FC<LinkInputProps> = ({ link, setLink }) => (
  <TMInput
    classNames={['link-input', 'white']}
    formValue={link}
    placeholder='link (required)'
    onChangeCallback={(updatedLink: string) => setLink(updatedLink)}
  />
);

interface NameInputProps {
  name: string,
  setName: (updatedName: string) => void,
};

const NameInput: FC<NameInputProps> = ({ name, setName }) => (
  <TMInput
    classNames={['name-input', 'white']}
    formValue={name}
    placeholder='name (optional)'
    onChangeCallback={(updatedName: string) => setName(updatedName)}
  />
);

interface CancelButtonProps {
  onCancelCallback: () => void,
};

const CancelButton: FC<CancelButtonProps> = ({ onCancelCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'dark-grey']}
    type={ButtonType.icon}
    size={ButtonSize.small}
    onClick={onCancelCallback}
    style={{ margin: '0' }}
  >
    <BsArrowReturnLeft />
  </TMButton>
);

interface DeleteButtonProps {
  onDeleteCallback: () => void,
};

const DeleteButton: FC<DeleteButtonProps> = ({ onDeleteCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'grey']}
    type={ButtonType.solid}
    size={ButtonSize.small}
    onClick={onDeleteCallback}
    style={{ marginRight: '10px' }}
  >
    Delete
  </TMButton>
);

interface SubmitButtonProps {
  isDisabled: boolean,
  isExistingAttachment: boolean,
  onSubmitCallback: () => void,
};

const SubmitButton: FC<SubmitButtonProps> = ({ isDisabled, isExistingAttachment, onSubmitCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'blue']}
    isDisabled={isDisabled}
    type={ButtonType.solid}
    size={ButtonSize.small}
    onClick={onSubmitCallback}
    style={{ marginRight: '0' }}
  >
    {isExistingAttachment ? 'Update' : 'Add'}
  </TMButton>
);

export default AttachmentMenu;
