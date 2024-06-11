// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  fullName: string | null;
  token: string | null;
  refreshToken: string | null;
  refreshTokenExpiration: string | null;
  isAuthentication: boolean;
}

const initialState: AuthState = {
  fullName: "",
  token: null,
  refreshToken: null,
  refreshTokenExpiration: null,
  isAuthentication: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ fullName: string, token: string, refreshToken: string, refreshTokenExpiration: string }>) => {
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
      state.isAuthentication = true;
    },
    clearCredentials: (state) => {
      state.fullName = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthentication = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
