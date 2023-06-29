import React from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '@/hooks/useLoadUserData';
import { Spin } from 'antd';
import useGuardPage from '@/hooks/useGuardPage';

const QuestionLayout = () => {
  // 加载用户数据
  const { waitingUserData } = useLoadUserData();
  // 加载用户数据之后判断是否需要启用路由保护机制
  useGuardPage(waitingUserData);
  return (
    <div className="h-screen">
      {waitingUserData ? (
        <div className=" text-center mt-16">
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
