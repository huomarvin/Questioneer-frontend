import React, { FC, useMemo } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  moveComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/surveyReducer';

const HeaderToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const selectedIndex = useMemo(() => {
    return componentList.findIndex(c => c.fe_id === selectedId);
  }, [componentList, selectedId]);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === componentList.length - 1;
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ selectedId, isHidden: true }));
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ selectedId }));
  }

  function moveUp() {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }

  function moveDown() {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default HeaderToolbar;
