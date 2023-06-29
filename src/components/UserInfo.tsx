import React, { FC } from 'react';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { HOME_PATHNAME, LOGIN_PATHNAME } from '@/router';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { removeToken } from '@/utils/user-token';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '@/store/userReducer';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { username, nickname } = useGetUserInfo();

  function logout() {
    dispatch(logoutReducer());
    removeToken();
    message.success('退出成功');
    nav(HOME_PATHNAME);
  }

  const UserInfo = (
    <div className="flex flex-row items-center">
      <span className="text-white text-xl">你好 {nickname}</span>
      <Button type="link" onClick={logout} icon={<UserOutlined />}>
        退出
      </Button>
    </div>
  );

  const Login = (
    <Button type="link">
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </Button>
  );

  return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;
