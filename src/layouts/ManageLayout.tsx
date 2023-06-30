import React from 'react';
import { MANAGE_LIST_PATHNAME, MANAGE_TRASH_PATHNAME, QUESTION_EDIT_PATHNAME } from '@/router';
import { useRequest } from 'ahooks';
import { Button, Divider, Space, message } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { createSurveyService } from '@/services/survey';
import { BarsOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useGuardPage from '@/hooks/useGuardPage';
import useLoadUserData from '@/hooks/useLoadUserData';

// 管理端布局
const ManageLayout = () => {
  const nav = useNavigate();
  const { waitingUserData } = useLoadUserData();
  useGuardPage(waitingUserData);
  const { loading, run: handleCreateClick } = useRequest(createSurveyService, {
    manual: true,
    onSuccess(result) {
      nav(QUESTION_EDIT_PATHNAME + `/${result._id}`);
      message.success('创建成功');
    },
  });
  return (
    <div className="w-10/12 px-6 mx-auto flex flex-row">
      <div className="w-30 mt-6">
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={handleCreateClick}
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider />
          <Button
            type="default"
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(MANAGE_LIST_PATHNAME)}
          >
            我的问卷
          </Button>
          <Button
            type="default"
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav(MANAGE_TRASH_PATHNAME)}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="p-6 flex flex-1 justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
