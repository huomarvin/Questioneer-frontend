import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';
import useLoadUserData from '@/hooks/useLoadUserData';

const { Header, Content, Footer } = Layout;

// 主页布局
const MainLayout = () => {
  const { waitingUserData } = useLoadUserData();
  return (
    <Layout className="flex h-screen">
      <Header className="flex py-6 items-center justify-between">
        <Logo />
        <div className="flex-1"></div>
        {waitingUserData ?? (
          <div className="text-center w-screen">
            <Spin />
          </div>
        )}
        <UserInfo />
      </Header>
      <Content className="w-screen h-auto flex-1 flex">
        {waitingUserData ? (
          <div className="text-center w-screen">
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className="text-center bg-slate-50 border-white border-b">
        皮皮问卷 &copy; 2023
      </Footer>
    </Layout>
  );
};

export default MainLayout;
