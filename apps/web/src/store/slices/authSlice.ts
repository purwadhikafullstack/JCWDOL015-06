import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'SUPER_ADMIN' | 'STORE_ADMIN' | 'USER' | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: AuthState['userRole'] }>) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
