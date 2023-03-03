import './index.scss';

import { FC, ReactElement } from 'react';
import { BsCalendarDate, BsChatSquareText, BsCardChecklist, BsTags } from 'react-icons/bs';

import { getDayMonthDateString, toClientDatetime } from 'utils';


interface IFooter {
  checklistItems: ChecklistItem[],
  comments: Comment[],
  dueDate: number,
  tags: Tag[],
};

const Footer: FC<IFooter> = ({ checklistItems, comments, dueDate, tags }) => {
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;
  const date = toClientDatetime(dueDate);

  return (
    <div className='task-card-footer sub-header-text'>
      <FooterStat icon={<BsCardChecklist />} stat={`${completed}/${total}`} />
      <FooterStat icon={<BsChatSquareText />} stat={comments.length.toString()} />
      <FooterStat icon={<BsTags />} stat={tags.length.toString()} />
      <FooterStat icon={<BsCalendarDate />} stat={getDayMonthDateString(date)} />
    </div>
  );
};

interface IFooterStat {
  icon: ReactElement,
  stat: string,
};

const FooterStat: FC<IFooterStat> = ({ icon, stat }) => (
  <div className='footer-stat'>
    {icon}
    {stat}
  </div>
);

export default Footer;
