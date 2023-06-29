import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserStateType = {
  username: string;
  nickname: string;
  token: string;
};

const INIT_STATE: UserStateType = { username: '', nickname: '', token: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<Partial<UserStateType>>) => {
      return { ...state, ...action.payload };
    },
    logoutReducer: () => {
      console.log('logoutReducer');
      return INIT_STATE;
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
