import { GET_USER_INFO_PATH, SIGN_UP_PATH, SIGN_IN_PATH } from '@/constants';
import axios, { ResDataType } from './ajax';

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const data = (await axios.get(GET_USER_INFO_PATH)) as ResDataType;
  return data;
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const body = { username, password, nickname: nickname || username };
  const data = (await axios.post(SIGN_UP_PATH, body)) as ResDataType;
  return data;
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const body = { username, password };
  const data = (await axios.post(SIGN_IN_PATH, body)) as ResDataType;
  return data;
}
