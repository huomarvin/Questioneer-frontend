import React, { FC, useMemo } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
  BlockOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/surveyReducer';
import useGetEditorUndoHistory from '@/hooks/useGetEditorUndoHistory';

const HeaderToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { past, future } = useGetEditorUndoHistory();
  console.log('🚀 ~ file: HeaderToolbar.tsx:27 ~ HeaderToolbar ~ future:', future);
  console.log('🚀 ~ file: HeaderToolbar.tsx:27 ~ HeaderToolbar ~ past:', past);
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

  function undo() {
    dispatch(ActionCreators.undo());
  }

  function redo() {
    dispatch(ActionCreators.redo());
  }

  function copy() {
    dispatch(copySelectedComponent());
  }

  function paste() {
    dispatch(pasteCopiedComponent());
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
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
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={undo}
          disabled={past.length === 0}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={redo}
          disabled={future.length === 0}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default HeaderToolbar;
