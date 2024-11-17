import { IAccountState } from '@/types/account';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAccountState = {
  accountState: false,
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  isVerify: 0,
};

// Set Slice
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<IAccountState>) => {
      const { accountState, id, firstName, lastName, email, isVerify } = action.payload;

      state.accountState = accountState;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.isVerify = isVerify;
    },
    setLogoutState: (state) => {
      state.accountState = false;
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.isVerify = 0
    }
  },
});

export const { setLoginState, setLogoutState } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
