import { Editor, Transforms, Element as SlateElement } from 'slate';

import { RichTextAlignmentTypes, RichTextListType } from 'types/constants/tm_rich_text_field';

const isBlockActive = (editor: Editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(
      editor,
      {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      },
    )
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: Editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    RichTextAlignmentTypes.includes(format) ? 'align' : 'type'
  );
  const isList = RichTextListType.includes(format);

  Transforms.unwrapNodes(
    editor,
    {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore
        RichTextListType.includes(n.type) &&
        !RichTextAlignmentTypes.includes(format),
      split: true,
    },
  );
  const newProperties: Partial<SlateElement> = RichTextAlignmentTypes.includes(format)
    // @ts-ignore
    ? { align: isActive ? undefined : format }
    // @ts-ignore
    : { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => isMarkActive(editor, format)
  ? Editor.removeMark(editor, format)
  : Editor.addMark(editor, format, true);

export {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
};
