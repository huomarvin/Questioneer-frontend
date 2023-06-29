import { useSelector } from 'react-redux';
import { StateType } from '@/store';
import { UserStateType } from '@/store/userReducer';

function useGetUserInfo() {
  const { username, nickname, token } = useSelector<StateType>(
    state => state.user
  ) as UserStateType;
  return { username, nickname, token };
}

export default useGetUserInfo;
