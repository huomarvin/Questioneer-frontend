import React from 'react';
import useSurveyListData from '@/hooks/useSurveyListData';
import { Table, Tag } from 'antd';
import ListContent from '@/components/ListContent';
import Pagination from '@/components/Pagination';

const ManageList = () => {
  const { data, loading } = useSurveyListData();
  const { list = [], total = 0 } = data;
  const tableColumns = [
    {
      title: '问卷标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '回答数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
  ];

  const TableElem = (
    <>
      <Table rowKey={q => q._id} dataSource={list} columns={tableColumns} pagination={false} />
      <div className="py-4 text-right bg-slate-50">
        <Pagination total={total} />
      </div>
    </>
  );
  return (
    <div className="flex flex-col flex-1">
      <ListContent loading={loading} list={list} renderList={() => TableElem} />
    </div>
  );
};

export default ManageList;
