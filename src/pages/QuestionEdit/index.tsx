import React from 'react';
import LeftPanel from './LeftPanel';
import EditCanvas from './EditCanvas';
import RightPanel from './RightPanel';
import Header from './Header';
import { useTitle } from 'ahooks';
import useLoadSurveyData from '@/hooks/useLoadSurveyData';

const QuestionEdit = () => {
  useTitle('编辑问卷');
  const { loading } = useLoadSurveyData();
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header />
        {!loading && (
          <div className="flex flex-row flex-1">
            <LeftPanel />
            <EditCanvas />
            <RightPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEdit;
