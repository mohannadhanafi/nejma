import React from 'react';
import { Pagination } from 'antd';

import './index.scss';

const PaginationComponent = ({ total, pageSize, onChange }) => {
  return (
    <div className="pagination">
      <Pagination
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        size="small"
        onChange={onChange}
       />
    </div>
  )
}

export default PaginationComponent;
