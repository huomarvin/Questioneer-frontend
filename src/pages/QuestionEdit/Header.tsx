import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Space, message } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { updateSurveyService } from '@/services/survey';
import { useDispatch } from 'react-redux';
import { changePageTitle } from '@/store/pageInfoReducer';
import HeaderToolbar from './HeaderToolbar';

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);

  const [editState, SetEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    console.log('🚀 ~ file: Header.tsx:20 ~ handleChange ~ newTitle:', newTitle);
    setNewTitle(newTitle);
  }

  function onFinish() {
    SetEditState(false);
    dispatch(changePageTitle(newTitle || '未命名问卷'));
  }

  if (editState) {
    return (
      <Input value={newTitle} onChange={handleChange} onPressEnter={onFinish} onBlur={onFinish} />
    );
  }

  return (
    <Space>
      <h2 className="mb-0">{title}</h2>
      <Button icon={<EditOutlined />} type="text" onClick={() => SetEditState(true)} />
    </Space>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateSurveyService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 标志着问卷已经被发布
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        nav('/question/stat/' + id); // 发布成功，跳转到统计页面
      },
    }
  );

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateSurveyService(id, { ...pageInfo, componentList });
    },
    { manual: true }
  );

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  );

  const manualSave = () => {
    save();
    message.success('保存成功');
  };

  return (
    <Button onClick={manualSave} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="h-16 bg-slate-100 flex items-center justify-between">
      <div className="w-64">
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <TitleElem />
        </Space>
      </div>
      <div className="flex-1 flex justify-center">
        <HeaderToolbar />
      </div>
      <div className="w-44">
        <Space>
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  );
};

export default Header;
