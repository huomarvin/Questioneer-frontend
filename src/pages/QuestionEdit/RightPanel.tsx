import React, { useEffect, useState } from 'react';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { getComponentConfByType } from '@/components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { updateComponent } from '@/store/surveyReducer';
import { Tabs } from 'antd';
import PageSetting from './PageSetting';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

function PropsEditorTooltip() {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return null;
  const { type, props, isHidden, isLocked } = selectedComponent;
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  const PropsEditor = conf.PropsEditor;
  const onChange = (newProps: any) => {
    dispatch(updateComponent(newProps));
  };
  return (
    <div className="p-6 bg-slate-100 w-56">
      <PropsEditor {...props} onChange={onChange} disabled={isHidden || isLocked} />
    </div>
  );
}

function RightPanel() {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <PropsEditorTooltip />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
}

export default RightPanel;
