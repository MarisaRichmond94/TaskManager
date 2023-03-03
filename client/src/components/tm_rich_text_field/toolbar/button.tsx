import { forwardRef, PropsWithChildren, Ref, useCallback } from 'react';
import { useSlate } from 'slate-react';

import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from 'components/tm_rich_text_field/utils';
import { RichTextAlignmentTypes } from 'enums';

const Button = forwardRef(
  (
    {
      className, active, reversed,
      ...props
    }: PropsWithChildren<
      { active: boolean } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => <span {...props} className={className} ref={ref} />
);

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  const isActive = isBlockActive(
    editor,
    format,
    RichTextAlignmentTypes.includes(format) ? 'align' : 'type',
  );

  return (
    <Button
      active={isActive}
      className={['mark-button', isActive ? 'active' : ''].join(' ')}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  const onMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    toggleMark(editor, format);
  }, [editor, format]);

  return (
    <Button
      active={isActive}
      className={['mark-button', isActive ? 'active' : ''].join(' ')}
      onMouseDown={onMouseDown}
    >
      {icon}
    </Button>
  );
};

export {
  BlockButton,
  MarkButton,
};
