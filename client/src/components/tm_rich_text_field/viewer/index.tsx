import { FC, useCallback, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react'
import {
  createEditor,
  Descendant,
} from 'slate';
import { withHistory } from 'slate-history';

import Element from 'components/tm_rich_text_field/element';
import Leaf from 'components/tm_rich_text_field/leaf';

const DEFAULT_VALUE = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

interface ITMRichTextViewer {
  classNames?: string[],
  value?: Descendant[],
};

const TMRichTextViewer: FC<ITMRichTextViewer> = ({
  classNames = [],
  value = DEFAULT_VALUE,
}) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={['tm-rich-text-field', ...classNames].join(' ')}>
      <Slate editor={editor} value={value}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export default TMRichTextViewer;
