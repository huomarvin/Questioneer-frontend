/**
 * @description 问卷 标题
 * @author 双越老师
 */

import Component from './Component';
import PropsEditor from './PropsEditor';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

// Title 组件的配置
const config = {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropsEditor,
  defaultProps: QuestionTitleDefaultProps,
};

export default config;
