import React from 'react';
import { useTranslation } from 'react-i18next';
import { Rate } from 'antd';

import './index.scss';

const ReviewCard = ({ reviews }) => {
  const { t } = useTranslation();
  return (
    <div className='review--card'>
      <div className='review--card--first--container'>
        <img className='avatar' src={require('assets/celeb3.png')} />
        <div className='review--comment'>
          <div className='rate--second'>
            <span className='rate--value'>0.5 </span>
            <Rate
              style={{ color: '#fa6914', fontSize: '30px' }}
              defaultValue={2}
            />
          </div>
          <h5>@khalid</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in ex eu augue pellentesque pretium.{' '}
          </p>
        </div>
      </div>
      <span>1 min ago</span>
    </div>
  );
};

export default ReviewCard;
