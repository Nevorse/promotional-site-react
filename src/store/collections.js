import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  services: [],
  coverImages: [],
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
    setAllCoverImagesDataHandler: (state, action) => {
      state.coverImages = action.payload;
    },
  },
});

export const { setAllProjectsDataHandler, setAllServicesDataHandler, setAllCoverImagesDataHandler } =
  collections.actions;
export default collections.reducer;
