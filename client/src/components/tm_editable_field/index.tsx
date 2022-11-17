import './index.scss';

import { FC, KeyboardEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Descendant } from 'slate';

import TMPlainTextField from 'components/tm_plain_text_field';
import TMRichTextField from 'components/tm_rich_text_field';
import TMRichTextViewer from 'components/tm_rich_text_field/viewer';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { FieldType } from 'types/constants/tm_editable_field';

const DEFAULT_INITIAL_VALUE = {
  [FieldType.richText]: undefined,
  [FieldType.plainText]: '',
};

type EditableFieldValue = string | RichTextParentEntity[] | undefined | null;

interface ITMEditableField {
  onUpdateCallback: (nextValue: EditableFieldValue) => void,

  autoFocus?: boolean,
  changeBackgroundOnHover?: boolean,
  classNames?: string[],
  fieldType?: FieldType,
  initialValue?: EditableFieldValue,
  placeholder?: string,
  submitEventKey?: string,
};

const TMEditableField: FC<ITMEditableField> = ({
  onUpdateCallback,

  autoFocus = false,
  changeBackgroundOnHover = true,
  classNames = [],
  fieldType = FieldType.richText,
  initialValue,
  placeholder = 'Enter input',
  submitEventKey = 'Enter',
}) => {
  const [isInEditMode, setIsInEditMode] = useState(autoFocus);
  const [value, setValue] = useState<EditableFieldValue>(
    [null, undefined].includes(initialValue as any)
      ? DEFAULT_INITIAL_VALUE[fieldType]
      : initialValue
  );

  /**
   * This is necessary because, when a component's initial state is set via props, that state will
   * not update when the props change. In this case, changing tasks was resulting in a stale
   * inputValue state which was, in turn, updating the new task to have the same description as the
   * previous task (as the inputValue was stale, causing the equality check to always return true)
   */
  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const preProcessValue = (updatedValue: EditableFieldValue) => {
    switch (fieldType) {
      case FieldType.richText:
        const richTextParentEntities = updatedValue as RichTextParentEntity[];
        const words = richTextParentEntities
          .map(entity => entity.children
          .map(child => child.text)).join(' ');
        return !!words ? JSON.stringify(updatedValue) : '';
      case FieldType.plainText:
        return updatedValue;
      default:
        throw Error(`TMEditableField recieved unknown field type ${fieldType}.`);
    }
  };

  const handleOnClickOutside = () => {
    if (value !== initialValue || initialValue === '') onUpdateCallback(preProcessValue(value));
    setIsInEditMode(false);
  };

  const plainTextRef = useRef(null);
  const editableFieldRef = useRef(null);
  useOnClickOutside(editableFieldRef, () => handleOnClickOutside());

  const onChangeCallback = useCallback((nextValue: EditableFieldValue) => {
    switch (fieldType) {
      case FieldType.richText:
        setValue(nextValue);
        return;
      case FieldType.plainText:
        const plainTextValue = nextValue as string;
        setValue(plainTextValue.replace(/(\r\n|\n|\r)/gm, ''));
        return;
      default:
        throw Error(`TMEditableField recieved unknown field type ${fieldType}.`);
    }
  }, [fieldType]);

  const onKeyPress = (event: KeyboardEvent<any>) => {
    if (event.key === submitEventKey) {
      onUpdateCallback(value);
      setIsInEditMode(false);
    }
  };

  const editMode = (): ReactElement => {
    const classes = ['tm-form-input', 'off-white', ...classNames];

    switch (fieldType) {
      case FieldType.richText:
        return (
          <TMRichTextField
            autoFocus={autoFocus}
            classNames={classes}
            onChangeCallback={onChangeCallback}
            placeholder={placeholder}
            showToolbar
            value={value as Descendant[] | undefined}
          />
        );
      case FieldType.plainText:
        return (
          <TMPlainTextField
            autoFocus
            classNames={classes}
            value={value as string}
            reference={plainTextRef}
            rowCount={1}
            onKeyPressCallback={onKeyPress}
            onChangeCallback={onChangeCallback}
          />
        );
      default:
        throw Error(`TMEditableField recieved unknown field type ${fieldType}.`);
    }
  };

  const viewMode = (): ReactElement => {
    switch (fieldType) {
      case FieldType.richText:
        return <TMRichTextViewer value={value as Descendant[] | undefined} />;
      case FieldType.plainText:
        return (
          <div>
            {initialValue as string ?? placeholder}
          </div>
        );
      default:
        throw Error(`TMEditableField recieved unknown field type ${fieldType}.`);
    }
  };

  const classes = [
    'tm-editable-field',
    changeBackgroundOnHover ? 'off-white' : '',
    isInEditMode ? 'edit-mode' : 'view-mode',
    fieldType,
    ...classNames,
  ];

  return (
    <div
      className={classes.join(' ')}
      onClick={() => setIsInEditMode(true)}
      ref={editableFieldRef}
    >
      {isInEditMode ? editMode() : viewMode()}
    </div>
  );
};

export default TMEditableField;
