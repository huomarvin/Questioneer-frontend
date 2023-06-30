import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import surveyReducer, { SurveyStateType } from './surveyReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  survey: SurveyStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    survey: surveyReducer,
    pageInfo: pageInfoReducer,
  },
});
