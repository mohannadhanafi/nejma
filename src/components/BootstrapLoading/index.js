import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';

export default function Index(props) {
  return (
    <div className='home-loading'>
      <LoadingOutlined className='icon' />
    </div>
  );
}
