import './index.scss';

import { FC, useRef, useState } from 'react';

import TMTextArea from 'components/tm_text_area';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import useResizeOnInputChange from 'hooks/useResizeOnInputChange';

interface ITMEditableInput {
  classNames?: string[],
  currInputValue?: string,
  eventKey?: string,
  id: string,
  noInputValuePlaceholder: string,
  onUpdateCallback: (nextInputValue: string) => void,
};

const TMEditableInput: FC<ITMEditableInput> = ({
  classNames = [],
  currInputValue,
  eventKey = 'Enter',
  id,
  noInputValuePlaceholder,
  onUpdateCallback,
}) => {
  const editableInputRef = useRef(null);
  useOnClickOutside(editableInputRef, () => setIsInEditMode(false));

  const textareaRef = useRef(null);
  const uniqueInputIdentifier = `auto-resizing-input-${id}`;
  useResizeOnInputChange(textareaRef, uniqueInputIdentifier);

  const [isInEditMode, setIsInEditMode] = useState(false);

  const onKeyPress = (event: any, nextInputValue: string) => {
    if (event.key === eventKey) {
      onUpdateCallback(nextInputValue);
      setIsInEditMode(false);
    }
  };

  return (
    <div
      className={['tm-editable-input', ...classNames].join(' ')}
      onClick={() => setIsInEditMode(true)}
      ref={editableInputRef}
    >
      {
        isInEditMode
        ? (
          <TMTextArea
            autoFocus
            classNames={['auto-resizing-textarea', ...classNames]}
            id={uniqueInputIdentifier}
            initialValue={currInputValue}
            onKeyPressCallback={onKeyPress}
            reference={textareaRef}
            rowCount={1}
          />
        )
        : <div className='inactive'>{currInputValue || noInputValuePlaceholder}</div>
      }
    </div>
  );
};

export default TMEditableInput;
