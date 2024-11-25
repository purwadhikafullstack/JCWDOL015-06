import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER' | null;
  id: number;
  email: string;
  isVerify: number;
  storeId: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  id: 0,
  email: '',
  isVerify: 0,
  storeId: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { userRole, id, email, isVerify, storeId } = action.payload;
      state.isAuthenticated = true;
      state.userRole = userRole;
      state.id = id;
      state.email = email;
      state.isVerify = isVerify;
      state.storeId = storeId;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.id = 0;
      state.email = '';
      state.isVerify = 0;
      state.storeId = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
