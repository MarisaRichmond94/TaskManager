import './index.scss';

import { FC, KeyboardEvent, useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react'
import {
  createEditor,
  Descendant,
} from 'slate';
import { withHistory } from 'slate-history';

import Element from 'components/tm_rich_text_field/element';
import Leaf from 'components/tm_rich_text_field/leaf';
import EditorToolbar from 'components/tm_rich_text_field/toolbar';
import { toggleMark } from 'components/tm_rich_text_field/utils';

const HOT_KEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const DEFAULT_VALUE = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

interface ITMRichTextField {
  autoFocus: boolean,
  placeholder: string,
  value?: Descendant[],
  onChangeCallback: (nextValue: any[]) => void,

  classNames?: string[],
  showToolbar?: boolean,
  onKeyDownCallback?: (event: KeyboardEvent<any>) => void,
};

const TMRichTextField: FC<ITMRichTextField> = ({
  autoFocus,
  placeholder,
  onChangeCallback,

  classNames = [],
  value = DEFAULT_VALUE,
  showToolbar,
  onKeyDownCallback,
}) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const onKeyDownHandler = (event: KeyboardEvent<any>) => {
    // internal hot key handler
    for (const hotkey in HOT_KEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        toggleMark(editor, HOT_KEYS[hotkey]);
        return;
      }
    }

    // if event is not an internal hotkey, call the prop key press handler
    if (onKeyDownCallback) onKeyDownCallback(event);
  };

  return (
    <div className={['tm-rich-text-field', ...classNames].join(' ')}>
      <Slate editor={editor} value={value} onChange={onChangeCallback}>
        {showToolbar && <EditorToolbar />}
        <Editable
          autoFocus={autoFocus}
          onKeyDown={onKeyDownHandler}
          placeholder={placeholder}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
        />
      </Slate>
    </div>
  );
};

export default TMRichTextField;
