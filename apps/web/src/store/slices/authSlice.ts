import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER' | null;
  id: number;
  email: string;
  isVerify: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  id: 0,
  email: '',
  isVerify: 0
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { userRole, id, email, isVerify } = action.payload;
      state.isAuthenticated = true;
      state.userRole = userRole;
      state.id = id;
      state.email = email;
      state.isVerify = isVerify;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.id = 0;
      state.email = '';
      state.isVerify = 0;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
