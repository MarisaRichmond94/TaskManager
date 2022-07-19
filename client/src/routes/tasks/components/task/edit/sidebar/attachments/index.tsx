import './index.scss';

import { ReactElement } from 'react';
import { BsFolderPlus, BsPencilSquare } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiJirasoftware } from 'react-icons/si';

import { TMButton } from 'components/tm_button';
import { TMCollapsableSection } from 'components/tm_collapsable_section';

interface TaskAttachmentsProps {
  id: string,
  attachments?: Attachment[],
};

const TaskAttachments = ({ id, attachments }: TaskAttachmentsProps): ReactElement => {
  const populateTaskAttachments = (taskAttachments?: Attachment[]): ReactElement[] | ReactElement => {
    if (!taskAttachments.length) return <NoAttachmentsToDisplay />;

    return taskAttachments.map((attachment, index) => {
      return <TaskAttachment key={`task-attachment-${index}`} attachment={attachment} />
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'task-attachment-section']}
      id={`task-card-${id}-attachments`}
      initiallyVisible
      rightBlock={<AddAttachmentButton />}
      sectionTitle='Links'
    >
      <div className='task-attachments-container task-sidebar-collapsable-container'>
        {populateTaskAttachments(attachments)}
      </div>
    </TMCollapsableSection>
  );
};

interface AttachmentProps {
  attachment: Attachment,
};

const TaskAttachment = ({ attachment }: AttachmentProps): ReactElement => {
  const { link, name, type } = attachment;

  const populateIcon = (attachmentType: AttachmentType): ReactElement => {
    switch (attachmentType) {
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
        {populateIcon(type)}
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
        onClick={() => console.log('open attachment menu')}
        size='small'
      >
        <BsPencilSquare />
      </TMButton>
    </div>
  );
};

const AddAttachmentButton = (): ReactElement => (
  <TMButton
    classNames={['grey', 'add-attachment-button']}
    buttonStyle='icon'
    size='medium'
    onClick={() => console.log('add attachment')}
  >
    <BsFolderPlus/>
  </TMButton>
);

const NoAttachmentsToDisplay = (): ReactElement => (
  <div className='sub-header-text no-attachments'>
    No links
  </div>
);

export default TaskAttachments;
