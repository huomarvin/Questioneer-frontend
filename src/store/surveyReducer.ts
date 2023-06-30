import produce from 'immer';
import { ComponentPropsType } from '@/components/QuestionComponents';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type SurveyStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
};

const INIT_STATE: SurveyStateType = {
  componentList: [],
  selectedId: '',
};

export const surveyReducer = createSlice({
  name: 'survey',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: produce((state: SurveyStateType, action: PayloadAction<SurveyStateType>) => {
      return action.payload;
    }),
    addComponent: produce((state: SurveyStateType, action: PayloadAction<ComponentInfoType>) => {
      state.componentList.push(action.payload);
      state.selectedId = action.payload.fe_id;
    }),
    changeSelectedId: produce((state: SurveyStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    }),
    updateComponent: produce((state: SurveyStateType, action: PayloadAction<ComponentInfoType>) => {
      const componentInfo = state.componentList.find(item => item.fe_id === state.selectedId);
      console.log(
        '🚀 ~ file: surveyReducer.ts:34 ~ updateComponent:produce ~ componentInfo:',
        componentInfo
      );
      if (componentInfo) {
        componentInfo.props = action.payload;
      }
    }),
  },
});

export const { addComponent, changeSelectedId, updateComponent, resetComponents } =
  surveyReducer.actions;

export default surveyReducer.reducer;
