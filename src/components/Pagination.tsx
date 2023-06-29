import React, { useEffect, useState } from 'react';
import { Pagination as AntdPagination } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PaginationProps = {
  total: number;
};

const Pagination = ({ total }: PaginationProps) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrent(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
    setPageSize(searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 10);
  }, [searchParams]);

  const onChange = (page: number, pageSize?: number) => {
    searchParams.set('page', String(page));
    searchParams.set('pageSize', String(pageSize));
    nav(`${pathname}?${searchParams.toString()}`);
  };

  return <AntdPagination total={total} current={current} pageSize={pageSize} onChange={onChange} />;
};

export default Pagination;
