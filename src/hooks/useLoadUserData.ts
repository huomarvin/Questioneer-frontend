import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import useGetUserInfo from './useGetUserInfo';
import { getUserInfoService } from '@/services/user';
import { useDispatch } from 'react-redux';
import { loginReducer } from '@/store/userReducer';

export default function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { token, username } = useGetUserInfo();
  const dispatch = useDispatch();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  useEffect(() => {
    // username有值代表已经登录，并且已经请求过用户信息
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
    // token变化的时候去请求一下，此时状态从未登录变为已登录
  }, [token, username, run]);
  return { waitingUserData };
}
