import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { LOGIN_PATHNAME, MANAGE_LIST_PATHNAME } from '@/router';
import useGetUserInfo from '@/hooks/useGetUserInfo';

const { Title, Paragraph } = Typography;

export const Home = () => {
  const { username } = useGetUserInfo();

  return (
    <div
      className="justify-center items-center w-screen flex flex-col"
      style={{ backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }}
    >
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
      <div>
        <Button size="large" type="primary">
          <Link to={username ? MANAGE_LIST_PATHNAME : LOGIN_PATHNAME}>开始使用</Link>
        </Button>
      </div>
    </div>
  );
};
