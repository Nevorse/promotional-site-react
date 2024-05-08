import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = action.payload;
    },
    logoutHandle: (state) => {
      state.user = false;
    },
  },
});

export const { loginHandle, logoutHandle } = auth.actions;
export default auth.reducer;