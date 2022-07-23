import './index.scss';

import { FC, useRef, useState } from 'react';

import TMTextArea from 'components/tm_text_area';
import useOnClickOutside from 'hooks/useOnOutsideClick';

interface ITMEditableInput {
  autoFocus?: boolean,
  classNames?: string[],
  currInputValue?: string,
  eventKey?: string,
  id: string,
  noInputValuePlaceholder?: string,
  onUpdateCallback: (nextInputValue: string) => void,
};

const TMEditableInput: FC<ITMEditableInput> = ({
  autoFocus = false,
  classNames = [],
  currInputValue,
  eventKey = 'Enter',
  id,
  noInputValuePlaceholder = '',
  onUpdateCallback,
}) => {
  const [inputValue, setInputValue] = useState<string>(currInputValue);

  const handleOnClickOutside = () => {
    if(inputValue !== currInputValue) onUpdateCallback(inputValue);
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
