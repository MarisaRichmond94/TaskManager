import './index.scss';

import { FC, MutableRefObject, useRef, useState } from 'react';

import TMDropdown from 'components/tm_dropdown';
import TMInput from 'components/tm_input';
import useKeyPress from 'hooks/useKeyPress';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import { TMButton } from 'components/tm_button';

interface IAttachmentMenu {
  attachment?: UpdateAttachmentDTO,
  attachmentsRef: MutableRefObject<any>,
  cancelKey?: string,
  submitKey?: string,
  onCancelCallback: () => void,
  onUpdateCallback: (updatedAttachment: CreateAttachmentDTO | UpdateAttachmentDTO) => void,
};

const AttachmentMenu: FC<IAttachmentMenu> = ({
  attachment,
  attachmentsRef,
  cancelKey = 'Escape',
  submitKey = 'Enter',
  onCancelCallback,
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
  const isSubmitKeyPressed = useKeyPress(submitKey);

  const cancel = () => {
    onCancelCallback();
  };

  const submit = () => {
    const dto = { attachmentTypeId: type?.id, link, name, taskId };
    if (attachment) delete dto.taskId;
    onUpdateCallback(dto);
  };

  if (isCancelKeyPressed) cancel();
  if (isSubmitKeyPressed) submit();

  return (
    <div className='sidebar-menu'>
      <TypeSelector type={type} setType={setType} />
      <LinkInput link={link} setLink={setLink} />
      <NameInput name={name} setName={setName} />
      <div className='action-container'>
        <CancelButton onCancelCallback={cancel} />
        <SubmitButton isExistingAttachment={!!attachment} onSubmitCallback={submit} />
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
    classNames={['attachment-menu-button', 'grey']}
    buttonStyle='solid'
    size='small'
    onClick={onCancelCallback}
  >
    Cancel
  </TMButton>
);

interface ISubmitButton {
  isExistingAttachment: boolean,
  onSubmitCallback: () => void,
};

const SubmitButton: FC<ISubmitButton> = ({ isExistingAttachment, onSubmitCallback }) => (
  <TMButton
    classNames={['attachment-menu-button', 'blue']}
    buttonStyle='solid'
    size='small'
    onClick={onSubmitCallback}
  >
    {isExistingAttachment ? 'Update' : 'Create'}
  </TMButton>
);

export default AttachmentMenu;
