import { RichTextElementType } from 'types/constants/tm_rich_text_field';

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case RichTextElementType.blockQuote:
      return <blockquote style={style} {...attributes}>{children}</blockquote>;
    case RichTextElementType.bullettedList:
      return <ul style={style} {...attributes}>{children}</ul>;
    case RichTextElementType.code:
      return (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      )
    case RichTextElementType.headingOne:
      return <h1 style={style} {...attributes}>{children}</h1>;
    case RichTextElementType.headingTwo:
      return <h2 style={style} {...attributes}>{children}</h2>;
    case RichTextElementType.listItem:
      return <li style={style} {...attributes}>{children}</li>;
    case RichTextElementType.numberedList:
      return <ol style={style} {...attributes}>{children}</ol>;
    default:
      return <p style={style} {...attributes}>{children}</p>;
  };
};

export default Element;
