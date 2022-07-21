import './index.scss';

import { FC, ReactElement, useState } from 'react';
import { BsCloudUpload, BsEraser, BsTrash } from 'react-icons/bs';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMTextArea from 'components/tm_text_area';
import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';
import { getFullDateString, getTimestampString, toClientDatetime } from 'utils/date';

const TaskComments: FC = () => {
  const { task } = useTask();
  const { comments, id } = task;
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

interface IComment {
  checklistItem: Comment,
};

const TaskComment: FC<IComment> = ({ checklistItem }) => {
  const { text, updatedAt } = checklistItem;
  const [isInEditMode, setIsInEditMode] = useState(false);

  const getCommentTimestamp = (secondsSinceEpoch: number): string => {
    const date = toClientDatetime(secondsSinceEpoch);
    return `${getFullDateString(date)} at ${getTimestampString(date)}`;
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

interface ICommentActionButton {
  icon: ReactElement,
  onClick: () => void,
};

const CommentActionButton: FC<ICommentActionButton> = ({ icon, onClick }) => (
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
