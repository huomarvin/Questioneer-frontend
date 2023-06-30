import { SURVEY_PATH } from '@/constants';
import axios, { ResDataType } from './ajax';

// 创建调查问卷
export const createSurveyService = async (): Promise<ResDataType> => {
  return (await axios.post(SURVEY_PATH)) as ResDataType;
};

// 查询调查问卷信息
export const getSurveyService = async (id: string): Promise<ResDataType> => {
  return (await axios.get(`${SURVEY_PATH}/${id}`)) as ResDataType;
};

// 查询调查问卷信息列表
export const getSurveyServiceList = async (params: any): Promise<ResDataType> => {
  return (await axios.get(`${SURVEY_PATH}`, { params })) as ResDataType;
};

// 更新调查问卷信息
export const updateSurveyService = async (id: string, body: any): Promise<ResDataType> => {
  console.log('🚀 ~ file: survey.ts:21 ~ updateSurveyService ~ body:', body);
  return (await axios.put(`${SURVEY_PATH}/${id}`, body)) as ResDataType;
};
