import './index.scss';

import { FC, useRef, useEffect, useState } from 'react';

import TMTextArea from 'components/tm_text_area';
import useOnClickOutside from 'hooks/useOnOutsideClick';

interface ITMEditableInput {
  id: string,

  autoFocus?: boolean,
  classNames?: string[],
  currInputValue?: string,
  eventKey?: string,
  noInputValuePlaceholder?: string,

  onUpdateCallback: (nextInputValue: string) => void,
};

const TMEditableInput: FC<ITMEditableInput> = ({
  id,

  autoFocus = false,
  classNames = [],
  currInputValue,
  eventKey = 'Enter',
  noInputValuePlaceholder = '',

  onUpdateCallback,
}) => {
  const [inputValue, setInputValue] = useState<string>(currInputValue);

  /**
   * This is necessary because when a component's initial state is set via props, that state will
   * not update when the props change. In this case, changing tasks was resulting in a stale
   * inputValue state which was, in turn, updating the new task to have the same description as the
   * previous task (as the inputValue was stale, causing the equality check to always return true)
   */
  useEffect(() => { setInputValue(currInputValue); }, [currInputValue]);

  const handleOnClickOutside = () => {
    if (inputValue !== currInputValue) onUpdateCallback(inputValue);
    setIsInEditMode(false);
  };

  const editableInputRef = useRef(null);
  useOnClickOutside(editableInputRef, () => handleOnClickOutside());

  const textareaRef = useRef(null);
  const uniqueInputIdentifier = `auto-resizing-input-${id}`;

  const [isInEditMode, setIsInEditMode] = useState(autoFocus);

  const onKeyPress = (event: any) => {
    if (event.key === eventKey) {
      onUpdateCallback(inputValue);
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
            managedValue={inputValue}
            onKeyPressCallback={onKeyPress}
            reference={textareaRef}
            rowCount={1}
            updatedManagedValue={(nextInputValue: string) => setInputValue(nextInputValue)}
          />
        )
        : <div className='inactive'>{currInputValue || noInputValuePlaceholder}</div>
      }
    </div>
  );
};

export default TMEditableInput;
