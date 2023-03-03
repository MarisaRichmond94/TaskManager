import './index.scss';

import { forwardRef, PropsWithChildren, Ref } from 'react';
import {
  BsBlockquoteLeft,
  BsCodeSlash,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
} from 'react-icons/bs';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa';
import { RiNumber1, RiNumber2 } from 'react-icons/ri';

import { BlockButton, MarkButton } from 'components/tm_rich_text_field/toolbar/button';
import { RichTextButtonType } from 'enums';

const Toolbar = forwardRef(
  (
    { ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      className='tm-rich-text-editor-toolbar'
      ref={ref}
    />
  )
);

const EditorToolbar = () => (
  <Toolbar>
    <MarkButton format={RichTextButtonType.bold} icon={<BsTypeBold />} />
    <MarkButton format={RichTextButtonType.italic} icon={<BsTypeItalic />} />
    <MarkButton format={RichTextButtonType.underline} icon={<BsTypeUnderline />} />
    <MarkButton format={RichTextButtonType.code} icon={<BsCodeSlash />} />
    <BlockButton format={RichTextButtonType.headingOne} icon={<RiNumber1 />} />
    <BlockButton format={RichTextButtonType.headingTwo} icon={<RiNumber2 />} />
    <BlockButton format={RichTextButtonType.blockQuote} icon={<BsBlockquoteLeft />} />
    <BlockButton format={RichTextButtonType.numberedList} icon={<BsListOl />} />
    <BlockButton format={RichTextButtonType.bulletedList} icon={<BsListUl />} />
    <BlockButton format={RichTextButtonType.left} icon={<FaAlignLeft />} />
    <BlockButton format={RichTextButtonType.center} icon={<FaAlignCenter />} />
    <BlockButton format={RichTextButtonType.right} icon={<FaAlignRight />} />
    <BlockButton format={RichTextButtonType.justify} icon={<FaAlignJustify />} />
  </Toolbar>
);

export default EditorToolbar;
