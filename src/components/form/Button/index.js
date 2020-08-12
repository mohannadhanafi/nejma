import React from 'react';
import './index.scss';
import { Spin } from 'antd';

export default function _Button(props) {
  const { onClick, className = '', ...rest } = props;
  return (
    <button
      className={`form-submit-btn ${className}`}
      type='submit'
      onClick={onClick}
      {...rest}
      disabled={props.isloading}
      style={{ cursor: props.isloading ? 'default' : 'pointer' }}
    >
      {props.isloading ? <Spin className='nejma-spin' /> : props.children}
    </button>
  );
}
