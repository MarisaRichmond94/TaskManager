import './index.scss';

import { ReactElement, useState } from 'react';
import { BsCloudUpload, BsEraser, BsTrash } from 'react-icons/bs';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMTextArea from 'components/tm_text_area';
import { TMButton } from 'components/tm_button';

interface TaskCommentsProps {
  id: string,
  comments?: Comment[],
};

const TaskComments = ({ id, comments }: TaskCommentsProps): ReactElement => {
  const [newCommentText, setNewCommentText] = useState('');

  const populateTaskComments = (taskComments?: Comment[]): ReactElement[] | ReactElement => {
    if (!taskComments.length) return;

    return taskComments.map((checklistItem, index) => {
      return <TaskComment key={`task-checklist-item-${index}`} checklistItem={checklistItem} />
    });
  };

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'comments-section']}
      id={`task-card-${id}-comments`}
      initiallyVisible
      sectionTitle={`Comments (${comments.length})`}
    >
      <div className='task-comments-container task-sidebar-collapsable-container'>
        <TMTextArea
          classNames={['task-comment-box']}
          managedValue={newCommentText}
          placeholder='comment...'
          setFormValue={setNewCommentText}
        />
        {populateTaskComments(comments)}
      </div>
    </TMCollapsableSection>
  );
};

interface CommentProps {
  checklistItem: Comment,
};

const TaskComment = ({ checklistItem }: CommentProps): ReactElement => {
  const { text, updatedAt } = checklistItem;
  const [isInEditMode, setIsInEditMode] = useState(false);

  const getCommentTimestamp = (datetime: string): string => {
    const date = new Date(datetime);
    return [
      `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}`,
      `at ${date.getUTCHours()}:${date.getUTCMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`,
    ].join(' ')
  };

  return (
    <div className='task-comment sub-header-text'>
      <div className='comment-text'>
        {text}
      </div>
      <div className='comment-details'>
        <i>{getCommentTimestamp(updatedAt)}</i>
        {
          isInEditMode
            ? (
              <CommentActionButton
                icon={<BsCloudUpload />}
                onClick={() => console.log('update comment')}
              />
            )
            : (
              <CommentActionButton
                icon={<BsEraser />}
                onClick={() => console.log('edit comment')}
              />
            )
        }
        <CommentActionButton icon={<BsTrash />} onClick={() => console.log('delete comment')} />
      </div>
    </div>
  );
};

interface CommentActionButtonProps {
  icon: ReactElement,
  onClick: () => void,
};

const CommentActionButton = ({ icon, onClick }: CommentActionButtonProps): ReactElement => (
  <TMButton
    buttonStyle='icon'
    classNames={['offset-black', 'comment-action-button']}
    size='medium'
    onClick={onClick}
  >
    {icon}
  </TMButton>
);

export default TaskComments;
