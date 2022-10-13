import './index.scss';

import { FC, MutableRefObject, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

import TMDropdown from 'components/tm_dropdown';
import TMInput from 'components/tm_input';
import useKeyPress from 'hooks/useKeyPress';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';

interface IAttachmentMenu {
  attachment?: UpdateAttachmentDTO,
  attachmentsRef: MutableRefObject<any>,
  cancelKey?: string,
  deleteKey?: string,
  submitKey?: string,
  onCancelCallback: () => void,
  onDeleteCallback: () => void,
  onUpdateCallback: (updatedAttachment: CreateAttachmentDTO | UpdateAttachmentDTO) => void,
};

const AttachmentMenu: FC<IAttachmentMenu> = ({
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

interface ITypeSelector {
  type: AttachmentType,
  setType: (updatedType: AttachmentType) => void,
};

const TypeSelector: FC<ITypeSelector> = ({ type, setType }) => {
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

interface ILinkInput {
  link: string,
  setLink: (updatedLink: string) => void,
};

const LinkInput: FC<ILinkInput> = ({ link, setLink }) => (
  <TMInput
    classNames={['link-input', 'white']}
    formValue={link}
    placeholder='link (required)'
    onChangeCallback={(updatedLink: string) => setLink(updatedLink)}
  />
);

interface INameInput {
  name: string,
  setName: (updatedName: string) => void,
};

const NameInput: FC<INameInput> = ({ name, setName }) => (
  <TMInput
    classNames={['name-input', 'white']}
    formValue={name}
    placeholder='name (optional)'
    onChangeCallback={(updatedName: string) => setName(updatedName)}
  />
);

interface ICancelButton {
  onCancelCallback: () => void,
};

const CancelButton: FC<ICancelButton> = ({ onCancelCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'dark-grey']}
    buttonStyle={ButtonStyle.icon}
    size={ButtonSize.small}
    onClick={onCancelCallback}
    style={{ margin: '0' }}
  >
    <BsArrowReturnLeft />
  </TMButton>
);

interface IDeleteButton {
  onDeleteCallback: () => void,
};

const DeleteButton: FC<IDeleteButton> = ({ onDeleteCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'grey']}
    buttonStyle={ButtonStyle.solid}
    size={ButtonSize.small}
    onClick={onDeleteCallback}
    style={{ marginRight: '10px' }}
  >
    Delete
  </TMButton>
);

interface ISubmitButton {
  isDisabled: boolean,
  isExistingAttachment: boolean,
  onSubmitCallback: () => void,
};

const SubmitButton: FC<ISubmitButton> = ({ isDisabled, isExistingAttachment, onSubmitCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'blue']}
    isDisabled={isDisabled}
    buttonStyle={ButtonStyle.solid}
    size={ButtonSize.small}
    onClick={onSubmitCallback}
    style={{ marginRight: '0' }}
  >
    {isExistingAttachment ? 'Update' : 'Add'}
  </TMButton>
);

export default AttachmentMenu;
