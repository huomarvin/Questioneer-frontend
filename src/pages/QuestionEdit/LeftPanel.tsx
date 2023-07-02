import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Input, Space, Tabs, message } from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents';
import {
  addComponent,
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
} from '@/store/surveyReducer';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import classnames from 'classnames';

function GenComponent(config: ComponentConfType, index: number) {
  const { Component, title, type, defaultProps } = config;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }, [defaultProps, dispatch, title, type]);
  return (
    <div
      key={index}
      className=" mt-3 cursor-pointer bg-slate-50 p-3 rounded border border-sky-500 hover:border-sky-600"
      onClick={handleClick}
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  );
}

function ComponentList() {
  return (
    <div className="w-52 p-6 bg-slate-100">
      {componentConfGroup.map(group => {
        const { components, groupId, groupName } = group;
        return (
          <div key={groupId} className="mt-6">
            <div className="text-lg font-bold">{groupName}</div>
            <div>{components.map((c, index) => GenComponent(c, index))}</div>
          </div>
        );
      })}
    </div>
  );
}

function Layers() {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  const [changingTitleId, setChangingTitleId] = useState('');
  const changeHidden = (selectedId: string, isHidden: boolean) => {
    dispatch(
      changeComponentHidden({
        selectedId,
        isHidden,
      })
    );
  };
  const changeLocked = (fe_id: string) => {};
  const handleTitleClick = (fe_id: string) => {
    const curComp = componentList.find(c => c.fe_id === fe_id);
    // 隐藏的组件在编辑器中不能同步展示
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (selectedId !== fe_id) {
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId('');
      return;
    }
    setChangingTitleId(fe_id);
  };

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ selectedId, title: newTitle }));
  }
  return (
    <div>
      {componentList.map(component => {
        const { fe_id, title, isHidden, isLocked } = component;
        const hiddenBtnCls = classnames({
          'opacity-20 hover:opacity-100': !isHidden,
        });
        const lockBtnCls = classnames({
          'opacity-20 hover:opacity-100': !isLocked,
        });
        return (
          <div
            key={fe_id}
            className="flex flex-row justify-between mt-4 cursor-pointer hover:bg-slate-100rounded border"
          >
            <div className="flex-1 p-3" onClick={() => handleTitleClick(fe_id)}>
              {fe_id !== changingTitleId ? (
                title
              ) : (
                <Input
                  size="small"
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              )}
            </div>
            <div className="p-3">
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={hiddenBtnCls}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={lockBtnCls}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="px-8 w-2/12">
      <Tabs
        defaultActiveKey="componentLib"
        items={[
          {
            key: 'componentLib',
            label: (
              <span>
                <AppstoreOutlined />
                组件库
              </span>
            ),
            children: <ComponentList />,
          },
          {
            key: 'layers',
            label: (
              <span>
                <BarsOutlined />
                图层
              </span>
            ),
            children: <Layers />,
          },
        ]}
      />
    </div>
  );
}

export default LeftPanel;
