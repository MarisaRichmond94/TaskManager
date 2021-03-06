import './index.scss';

import { FC, ReactElement, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMEditableInput from 'components/tm_input/editable';
import TMTextArea from 'components/tm_text_area';
import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';
import { getFullDateString, getTimestampString, toClientDatetime } from 'utils/date';

const TaskComments: FC = () => {
  const { comments, id, createComment } = useTask();
  const [text, setText] = useState('');

  const populateTaskComments = (taskComments?: Comment[]): ReactElement[] | ReactElement => {
    if (!taskComments.length) return;

    taskComments.sort(
      (a,b) => (a.updatedAt < b.updatedAt) ? 1 : ((b.updatedAt < a.updatedAt) ? -1 : 0)
    );
    return taskComments.map((comment, index) => {
      return <TaskComment key={`task-comment-${index}`} comment={comment} />
    });
  };

  const onKeyPressCallback = (e: any) => {
    if (e.key === 'Enter' && text !== '') {
      createComment({ taskId: id, text });
      setText('');
    }
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
          classNames={['task-comment-box', 'sub-header-text']}
          managedValue={text}
          placeholder='comment...'
          onKeyPressCallback={(e: any) => onKeyPressCallback(e)}
          updatedManagedValue={setText}
        />
        {populateTaskComments(comments)}
      </div>
    </TMCollapsableSection>
  );
};

interface IComment {
  comment: Comment,
};

const TaskComment: FC<IComment> = ({ comment }) => {
  const { deleteComment, updateComment } = useTask();
  const { id, text, updatedAt } = comment;

  const getCommentTimestamp = (secondsSinceEpoch: number): string => {
    const date = toClientDatetime(secondsSinceEpoch);
    return `${getFullDateString(date)} at ${getTimestampString(date)}`;
  };

  return (
    <div className='task-comment sub-header-text'>
      <div className='comment-text'>
        <TMEditableInput
          classNames={['sub-header-text']}
          currInputValue={text}
          eventKey='Enter'
          id={`comment-${id}`}
          onUpdateCallback={(updatedText: string) => updateComment(id, updatedText)}
        />
      </div>
      <div className='comment-details'>
        <i>{getCommentTimestamp(updatedAt)}</i>
        <CommentActionButton icon={<BsTrash />} onClick={() => deleteComment(id)} />
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
