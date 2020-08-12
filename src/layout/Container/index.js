import React from 'react';
import { Row } from 'antd';
import './index.scss';

export default function Container(props) {
  return <Row className='nejma-container'>{props.children}</Row>;
}
