import React from 'react';
import { Outlet } from 'react-router-dom';

// 管理端布局
const ManageLayout = () => {
  return (
    <div className="w-10/12 px-6">
      <div className="w-30">TODO</div>
      <div className="ml-14">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
