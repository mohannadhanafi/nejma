import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';

export default function Loading(props) {
  return (
    <div className='loading'>
      <LoadingOutlined className='icon' />
    </div>
  );
}
