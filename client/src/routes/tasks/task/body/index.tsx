import { FC } from 'react';

interface IBody {
  description: string,
};

const Body: FC<IBody> = ({ description }) => (
  <div className='task-card-body sub-header-text'>
    {description}
  </div>
);

export default Body;
