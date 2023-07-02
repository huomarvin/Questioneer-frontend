import { StateType } from '@/store';
import { SurveyStateType } from '@/store/surveyReducer';
import { useSelector } from 'react-redux';

function useGetComponentInfo() {
  const { componentList, selectedId, copiedComponent } = useSelector<StateType, SurveyStateType>(
    state => state.survey
  );
  return {
    componentList,
    selectedId,
    selectedComponent: componentList.find(item => item.fe_id === selectedId),
    copiedComponent,
  };
}

export default useGetComponentInfo;
