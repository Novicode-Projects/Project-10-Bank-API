import { createSlice } from "@reduxjs/toolkit";

export type SessionState = {
  token: string | null;
};

const initialState: SessionState = {
  token: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
