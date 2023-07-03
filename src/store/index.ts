import { configureStore } from '@reduxjs/toolkit';
import undoable, { StateWithHistory } from 'redux-undo';
import userReducer, { UserStateType } from './userReducer';
import surveyReducer, { SurveyStateType } from './surveyReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  survey: StateWithHistory<SurveyStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    survey: undoable(surveyReducer, {
      limit: 20,
    }),
    pageInfo: pageInfoReducer,
  },
});
