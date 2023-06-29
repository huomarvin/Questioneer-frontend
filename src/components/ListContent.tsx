import { Empty, Spin } from 'antd';
import React from 'react';

interface ListContentProps {
  loading: boolean;
  list: any[];
  renderList: (list: any[]) => React.ReactNode;
}

const ListContent = ({ loading, list, renderList }: ListContentProps) => {
  return (
    <>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && list.length === 0 && <Empty description="暂无数据" />}
      {!loading && list.length > 0 && renderList(list)}
    </>
  );
};

export default ListContent;
