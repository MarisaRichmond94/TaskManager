import './index.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC, ReactElement, useRef, useState } from 'react';
import { BsFolderPlus, BsPencilSquare } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiJirasoftware } from 'react-icons/si';

import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import { useTask } from 'providers/task';
import AttachmentMenu from 'routes/tasks/workspace/attachment_menu';

const TaskAttachments: FC = () => {
  const { attachments, id, createAttachment, deleteAttachment, updateAttachment } = useTask();
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [activeAttachment, setActiveAttachment] = useState<Attachment | undefined>();
  const attachmentsRef = useRef(null);

  const populateTaskAttachments = (taskAttachments?: Attachment[]): ReactElement[] | ReactElement => {
    if (!taskAttachments.length) return <NoAttachmentsToDisplay />;

    return taskAttachments.map((attachment, index) => {
      return (
        <TaskAttachment
          key={`task-attachment-${index}`}
          attachment={attachment}
          onEditCallback={onEditCallback}
        />
      );
    });
  };

  const onEditCallback = (attachment: Attachment) => {
    setActiveAttachment(attachment);
    setShowAttachmentMenu(true);
  };

  const onCloseCallback = () => {
    setShowAttachmentMenu(false);
    if (activeAttachment) setActiveAttachment(undefined);
  };

  const onDeleteCallback = () => {
    if (activeAttachment) deleteAttachment(activeAttachment.id);
    onCloseCallback();
  };

  const onUpdateCallback = async (updatedAttachment: CreateAttachmentDTO | UpdateAttachmentDTO) => {
    activeAttachment
      ? await updateAttachment(activeAttachment.id, updatedAttachment as UpdateAttachmentDTO)
      : await createAttachment(updatedAttachment as CreateAttachmentDTO);
    onCloseCallback();
  };

  return (
    <TMControlledCollapsableSection
      classNames={['off-black', 'task-section', 'task-attachment-section', 'task-sidebar-section']}
      id={`task-card-${id}-attachments`}
      initiallyVisible
      onToggleCallback={() => setShowAttachmentMenu(false)}
      reference={attachmentsRef}
      rightBlock={
        <AddAttachmentButton
          showAttachmentMenu={showAttachmentMenu}
          setShowAttachmentMenu={setShowAttachmentMenu}
        />
      }
      sectionTitle='Links'
    >
      <div
        className='menu-container sidebar-menu-container task-sidebar-collapsable-container'
        id='task-attachments-container'
      >
        {
          showAttachmentMenu &&
          <AttachmentMenu
            attachment={
              activeAttachment &&
              {
                attachmentTypeId: activeAttachment.type.id,
                link: activeAttachment.link,
                name: activeAttachment.name,
              }
            }
            attachmentsRef={attachmentsRef}
            onCancelCallback={onCloseCallback}
            onDeleteCallback={onDeleteCallback}
            onUpdateCallback={onUpdateCallback}
          />
        }
        {populateTaskAttachments(attachments)}
      </div>
    </TMControlledCollapsableSection>
  );
};

interface IAttachment {
  attachment: Attachment,
  onEditCallback: (attachment: Attachment) => void,
};

const TaskAttachment: FC<IAttachment> = ({ attachment, onEditCallback }) => {
  const { link, name, type } = attachment;

  const populateIcon = (attachmentTypeName: AttachmentTypeName): ReactElement => {
    switch (attachmentTypeName) {
      case 'JIRA':
        return <SiJirasoftware style={{ color: '#2685FF' }} />;
      case 'GitHub':
        return <FaGithub style={{ color: '#8E44AD' }} />;
      case 'Google':
      default:
        return <FcGoogle />;
    }
  };

  return (
    <div className='task-attachment'>
      <div className='attachment-icon'>
        {populateIcon(type.name)}
      </div>
      <div
        className='sub-header-text attachment-name hide-overflow-ellipsis'
        onClick={() => {
          window.open(
            link.startsWith('https://') ? link : `https://${link}`,
            '_blank',
            'noopener,noreferrer',
          );
        }}
        title={name}
      >
        <b>{name}</b>
      </div>
      <RichButton
        classNames={['edit-attachment-button']}
        onClick={() => onEditCallback(attachment)}
        size={RichButtonSize.Small}
        type={RichButtonType.Icon}
      >
        <BsPencilSquare />
      </RichButton>
    </div>
  );
};

interface IAddAttachmentButton {
  showAttachmentMenu: boolean,
  setShowAttachmentMenu: (showAttachmentMenu: boolean) => void,
};

const AddAttachmentButton: FC<IAddAttachmentButton> = ({
  showAttachmentMenu,
  setShowAttachmentMenu,
}) => (
  <RichButton
    classNames={['toggle-menu-button', showAttachmentMenu ? 'active' : '']}
    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
    type={RichButtonType.Icon}
  >
    <BsFolderPlus/>
  </RichButton>
);

const NoAttachmentsToDisplay: FC = () => (
  <div className='sub-header-text no-attachments'>
    No links
  </div>
);

export default TaskAttachments;
