import './CommentsSection.scss';

import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import TMEditableField, { FieldType } from 'components/tm_editable_field';
import TMTextArea from 'components/tm_text_area';
import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import { usePrevious } from 'hooks';
import { useTask } from 'providers';
import { getFullDateString, getTimestampString, toClientDatetime } from 'utils';

const CommentSection: FC = () => {
  const { comments, id, createComment } = useTask();
  const [text, setText] = useState('');

  const populateTaskComments = (taskComments?: Comment[]): ReactElement[] | ReactElement => {
    if (!taskComments.length) return;

    taskComments.sort(
      (a,b) => (a.updatedAt < b.updatedAt) ? 1 : ((b.updatedAt < a.updatedAt) ? -1 : 0)
    );

    return taskComments.map((comment, index) => {
      const key = `comment-${index}`;
      return <Comment key={key} comment={comment} id={key} />
    });
  };

  const onKeyPressCallback = (e: any) => {
    if (e.key === 'Enter' && text !== '') {
      createComment({ taskId: id, text });
      setText('');
    }
  };

  return (
    <TMControlledCollapsableSection
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
          updateManagedValue={setText}
        />
        {populateTaskComments(comments)}
      </div>
    </TMControlledCollapsableSection>
  );
};

interface CommentProps {
  comment: Comment,
  id: string,
};

const Comment: FC<CommentProps> = ({ comment, id: derivedId }) => {
  const { newCommentId, deleteComment, updateComment } = useTask();
  const commentRef = useRef(null);
  const prevNewCommentId = usePrevious(newCommentId);
  const { id, text, updatedAt } = comment;

  useEffect(() => {
    if (prevNewCommentId !== newCommentId && newCommentId === id) {
      commentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [id, newCommentId, prevNewCommentId]);

  const getCommentTimestamp = (secondsSinceEpoch: number): string => {
    const date = toClientDatetime(secondsSinceEpoch);
    return `${getFullDateString(date)} at ${getTimestampString(date)}`;
  };

  return (
    <div className='task-comment sub-header-text' id={derivedId} ref={commentRef}>
      <div className='comment-text'>
        <TMEditableField
          classNames={['sub-header-text']}
          fieldType={FieldType.plainText}
          initialValue={text}
          onUpdateCallback={(updatedText: string) => {
            if (text !== '') updateComment(id, updatedText);
          }}
        />
      </div>
      <div className='comment-details'>
        <i>{getCommentTimestamp(updatedAt)}</i>
        <CommentActionButton icon={<BsTrash />} onClick={() => deleteComment(id)} />
      </div>
    </div>
  );
};

interface CommentActionButtonProps {
  icon: ReactElement,
  onClick: () => void,
};

const CommentActionButton: FC<CommentActionButtonProps> = ({ icon, onClick }) => (
  <TMButton
    type={ButtonType.icon}
    classNames={['offset-black', 'comment-action-button']}
    size={ButtonSize.medium}
    onClick={onClick}
  >
    {icon}
  </TMButton>
);

export default CommentSection;
