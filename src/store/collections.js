import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  services: [],
};

const collections = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setAllProjectsDataHandler: (state, action) => {
      state.projects = action.payload;
    },
    setAllServicesDataHandler: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setAllProjectsDataHandler, setAllServicesDataHandler } =
  collections.actions;
export default collections.reducer;
