import Component from './Component';
import PropsEditor from './PropsEditor';
import { QuestionInputDefaultProps } from './interface';

export * from './interface';

const config = {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropsEditor,
  defaultProps: QuestionInputDefaultProps,
};

export default config;
