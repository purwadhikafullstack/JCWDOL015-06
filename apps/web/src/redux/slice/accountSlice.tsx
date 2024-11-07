import { IAccountState } from '@/types/account';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAccountState = {
  accountState: false,
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
};

// Set Slice
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<IAccountState>) => {
      const { accountState, id, firstName, lastName, email } = action.payload;

      state.accountState = accountState;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
    },
    setLogoutState: (state) => {
      state.accountState = false;
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    }
  },
});

export const { setLoginState, setLogoutState } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
