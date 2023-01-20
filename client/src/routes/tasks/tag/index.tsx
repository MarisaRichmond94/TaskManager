import './index.scss';

import { RichButton, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

interface ITag {
  classNames?: string[],
  hexColor: string,
  id: string,
  isInUse?: boolean,
  name: string,
  onAddTagCallback?: (tagId: string) => void,
  onDeleteTagCallback?: (tagId: string) => void,
};

const Tag: FC<ITag> = ({
  classNames = [],
  hexColor,
  id,
  isInUse = false,
  name,
  onAddTagCallback,
  onDeleteTagCallback,
}) => (
  <div className={['tag', ...classNames].join(' ')} style={{ backgroundColor: hexColor }}>
    <div className='sub-header-text'>
      {name}
    </div>
    <RichButton
      onClick={() => isInUse ? onDeleteTagCallback(id) : onAddTagCallback(id)}
      type={RichButtonType.Icon}
    >
      {isInUse ? <BsX /> : <IoMdAdd />}
    </RichButton>
  </div>
);

export default Tag;
