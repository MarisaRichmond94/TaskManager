import './index.scss';

import { FC, ReactElement, useRef, useState } from 'react';
import { BsFolderPlus, BsPencilSquare } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiJirasoftware } from 'react-icons/si';

import { TMButton } from 'components/tm_button';
import TMCollapsableSection from 'components/tm_collapsable_section';
import { useTask } from 'providers/task';
import AttachmentMenu from 'routes/tasks/components/task/edit/sidebar/attachments/menu';

const TaskAttachments: FC = () => {
  const { attachments, id, createAttachment, updateAttachment } = useTask();
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

  const onUpdateCallback = async (updatedAttachment: CreateAttachmentDTO | UpdateAttachmentDTO) => {
    activeAttachment
      ? updateAttachment(activeAttachment.id, updatedAttachment as UpdateAttachmentDTO)
      : createAttachment(updatedAttachment as CreateAttachmentDTO);
    onCloseCallback();
  };

  return (
    <TMCollapsableSection
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
      <div className='sidebar-menu-container task-sidebar-collapsable-container'>
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
            onUpdateCallback={onUpdateCallback}
          />
        }
        {populateTaskAttachments(attachments)}
      </div>
    </TMCollapsableSection>
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
        onClick={() => console.log(`Navigate to ${link}`)}
        title={name}
      >
        <b>{name}</b>
      </div>
      <TMButton
        classNames={['grey', 'edit-attachment-button']}
        buttonStyle='icon'
        onClick={() => onEditCallback(attachment)}
        size='small'
      >
        <BsPencilSquare />
      </TMButton>
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
  <TMButton
    classNames={['grey', 'toggle-menu-button', showAttachmentMenu ? 'active' : '']}
    buttonStyle='icon'
    size='medium'
    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
  >
    <BsFolderPlus/>
  </TMButton>
);

const NoAttachmentsToDisplay: FC = () => (
  <div className='sub-header-text no-attachments'>
    No links
  </div>
);

export default TaskAttachments;
