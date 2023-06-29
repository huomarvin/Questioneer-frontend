import React from 'react';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME } from '@/router';

const Logo = () => {
  return (
    <div className="w-52 text-center py-1.5">
      <Link to={HOME_PATHNAME}>
        <div className="flex flex-row items-center">
          <h1 className="text-2xl text-white ">
            <FormOutlined className="align-text-bottom" /> 皮皮问卷
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
