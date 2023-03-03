enum RichTextButtonType {
  bold = 'bold',
  center = 'center',
  code = 'code',
  italic = 'italic',
  justify = 'justify',
  left = 'left',
  right = 'right',
  underline = 'underline',
  blockQuote = 'block-quote',
  bulletedList = 'bulleted-list',
  headingOne = 'heading-one',
  headingTwo = 'heading-two',
  numberedList = 'numbered-list',
};

const RichTextAlignmentTypes = [
  RichTextButtonType.center,
  RichTextButtonType.justify,
  RichTextButtonType.left,
  RichTextButtonType.right,
];

enum RichTextElementType {
  blockQuote = 'block-quote',
  bullettedList = 'bulleted-list',
  code = 'code',
  headingOne = 'heading-one',
  headingTwo = 'heading-two',
  listItem = 'list-item',
  numberedList = 'numbered-list',
};

enum RichTextParentType {
  blockQuote = 'block-quote',
  bulletedList = 'bulleted-list',
  headingOne = 'heading-one',
  headingTwo = 'heading-two',
  numberedList = 'numbered-list',
  paragraph = 'paragraph',
};

const RichTextListType = [RichTextParentType.bulletedList, RichTextParentType.numberedList];

export {
  RichTextAlignmentTypes,
  RichTextButtonType,
  RichTextElementType,
  RichTextListType,
  RichTextParentType,
};
