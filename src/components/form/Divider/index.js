import React from 'react';
import './index.scss';

export default function Divider(props) {
  return (
    <div className='form-divider'>
      <span>{props.value}</span>
    </div>
  );
}
