import { StateWithHistory } from 'redux-undo';
import { StateType } from '@/store';
import { SurveyStateType } from '@/store/surveyReducer';
import { useSelector } from 'react-redux';

function useGetEditorUndoHistory() {
  const { past, future } = useSelector<StateType, StateWithHistory<SurveyStateType>>(
    state => state.survey
  );
  return { past, future };
}

export default useGetEditorUndoHistory;
