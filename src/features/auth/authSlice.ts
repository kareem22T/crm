// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  refreshTokenExpiration: string | null;
  isAuthentication: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  refreshTokenExpiration: null,
  isAuthentication: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; refreshToken: string, refreshTokenExpiration: string }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
      state.isAuthentication = true;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthentication = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
