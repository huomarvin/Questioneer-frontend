import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index';

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>; // 组件
  PropsEditor: FC<ComponentPropsType>; // 属性编辑组件
  defaultProps: ComponentPropsType; // LeftPanel显示数据
};

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
