import produce from 'immer';
import { ComponentPropsType } from '@/components/QuestionComponents';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { arrayMove } from '@dnd-kit/sortable';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
  isHidden?: boolean;
  isLocked?: boolean;
};

export type SurveyStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: SurveyStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: produce((state: SurveyStateType, action: PayloadAction<SurveyStateType>) => {
      return action.payload;
    }),
    addComponent: produce((state: SurveyStateType, action: PayloadAction<ComponentInfoType>) => {
      insertNewComponent(state, action.payload);
    }),
    changeSelectedId: produce((state: SurveyStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    }),
    updateComponent: produce((state: SurveyStateType, action: PayloadAction<ComponentInfoType>) => {
      const componentInfo = state.componentList.find(item => item.fe_id === state.selectedId);
      if (componentInfo) {
        componentInfo.props = action.payload;
      }
    }),
    removeSelectedComponent: produce((state: SurveyStateType) => {
      const index = state.componentList.findIndex(item => item.fe_id === state.selectedId);
      const nextId = getNextId(state.componentList, index);
      if (index !== -1) {
        state.componentList.splice(index, 1);
      }
      state.selectedId = nextId;
    }),
    changeComponentHidden: produce(
      (
        state: SurveyStateType,
        action: PayloadAction<{ selectedId: string; isHidden: boolean }>
      ) => {
        const index = state.componentList.findIndex(
          item => item.fe_id === action.payload.selectedId
        );
        const nextId = getNextId(state.componentList, index);
        const componentInfo = state.componentList[index];
        if (componentInfo) {
          componentInfo.isHidden = action.payload.isHidden;
        }
        state.selectedId = nextId;
      }
    ),
    changeComponentTitle: produce(
      (state: SurveyStateType, action: PayloadAction<{ selectedId: string; title: string }>) => {
        const index = state.componentList.findIndex(
          item => item.fe_id === action.payload.selectedId
        );
        const componentInfo = state.componentList[index];
        if (componentInfo) {
          componentInfo.title = action.payload.title;
        }
      }
    ),
    toggleComponentLocked: produce(
      (state: SurveyStateType, action: PayloadAction<{ selectedId: string }>) => {
        const componentInfo = state.componentList.find(
          item => item.fe_id === action.payload.selectedId
        );
        if (componentInfo) {
          componentInfo.isLocked = !componentInfo.isLocked;
        }
      }
    ),
    moveComponent: produce(
      (draft: SurveyStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
        const { componentList } = draft;
        const { oldIndex, newIndex } = action.payload;
        // arrayMove返回的是一个新的数组，不是移动的原数组，这个地方需要重新赋值
        draft.componentList = arrayMove(componentList, oldIndex, newIndex);
      }
    ),
    copySelectedComponent: produce((draft: SurveyStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedComponent = componentList.find(c => c.fe_id === selectedId);
      if (selectedComponent == null) return;
      draft.copiedComponent = cloneDeep(selectedComponent);
    }),
    pasteCopiedComponent: produce((draft: SurveyStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
  },
});

/**
 *
 * @param componentList 组件列表
 * @param index 当前选中元素的数组下标
 * @returns 下一个选中元素的id
 */
function getNextId(componentList: Array<ComponentInfoType>, index: number): string {
  if (index === -1) {
    return '';
  }
  if (index === componentList.length - 1) {
    return componentList[index - 1].fe_id;
  }
  return componentList[index + 1].fe_id;
}

/**
 * 新增组件
 * @param draft 状态列表
 * @param copiedComponent 待添加组件
 * @returns
 */
function insertNewComponent(draft: SurveyStateType, copiedComponent: ComponentInfoType | null) {
  if (copiedComponent == null) return;
  const { componentList, selectedId } = draft;
  const index = componentList.findIndex(c => c.fe_id === selectedId);
  if (index === -1) {
    componentList.push(copiedComponent);
  } else {
    componentList.splice(index + 1, 0, copiedComponent);
  }
  draft.selectedId = copiedComponent.fe_id;
}

export const {
  addComponent,
  changeSelectedId,
  updateComponent,
  resetComponents,
  removeSelectedComponent,
  changeComponentHidden,
  changeComponentTitle,
  toggleComponentLocked,
  moveComponent,
  copySelectedComponent,
  pasteCopiedComponent,
} = surveySlice.actions;

export default surveySlice.reducer;
