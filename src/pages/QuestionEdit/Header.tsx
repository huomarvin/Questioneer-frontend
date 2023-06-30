import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Space } from 'antd';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import { updateSurveyService } from '@/services/survey';
import { useDispatch } from 'react-redux';
import { changePageTitle } from '@/store/pageInfoReducer';

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

const Header = () => {
  const nav = useNavigate();
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
  return (
    <div className="h-16 bg-slate-100 flex items-center">
      <div>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <TitleElem />
        </Space>
      </div>
      <div>
        <Button type="primary" onClick={save} disabled={loading}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default Header;
