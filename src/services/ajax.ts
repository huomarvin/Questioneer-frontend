import axios from 'axios';
import { getToken } from '@/utils/user-token';
import { message } from 'antd';

const noMessageShowURL = ['/api/v1/user/info'];

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`; // JWT 的固定格式
    return config;
  },
  error => Promise.reject(error)
);

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType;
    console.log('🚀 ~ file: ajax.ts:20 ~ resData:', resData);
    // TODO: 大部分使用http状态码来处理的，这个地方如何优化一下
    return resData as any;
  },
  error => {
    console.log('🚀 ~ file: ajax.ts:24 ~ error:', error);
    let msg = error.message;
    const response = error?.response;
    if (error.code === 'ERR_BAD_REQUEST') {
      const newMsg = response?.data?.error;
      if (newMsg) {
        msg = JSON.stringify(newMsg);
      }
    }
    if (!noMessageShowURL.includes(error?.response?.config?.url)) {
      message.error(msg);
    }
    return Promise.reject(error);
  }
);

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
