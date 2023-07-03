import React from 'react';
import LeftPanel from './LeftPanel';
import EditCanvas from './EditCanvas';
import RightPanel from './RightPanel';
import Header from './Header';
import { useTitle } from 'ahooks';
import useLoadSurveyData from '@/hooks/useLoadSurveyData';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '@/store/surveyReducer';

const QuestionEdit = () => {
  useTitle('编辑问卷');
  const { loading } = useLoadSurveyData();
  const dispatch = useDispatch();
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''));
  };
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header />
        {!loading && (
          <div className="flex flex-row flex-1">
            <LeftPanel />
            <div className="flex-1" onClick={clearSelectedId}>
              <EditCanvas />
            </div>
            <div className="w-64">
              <RightPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEdit;
