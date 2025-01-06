import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  services: [],
  coverImages: [],
  projectFolders: [],
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
    setAllProjectFoldersDataHandler: (state, action) => {
      let index;
      let obj;

      state.projectFolders.find((o, i) => {
        if (o.id == action.payload.id) {
          obj = o
          index = i;
        }
      })

      if (obj == undefined) {
        state.projectFolders = [...state.projectFolders, action.payload];
      } 
      // else if (index) {
      //   const arr = state.serviceFolders.splice(index, 1, action.payload);
      //   console.log(1, arr);
      //   state.serviceFolders = arr;
      // }
      else if (obj?.data.length != action.payload.data.length) {
        state.projectFolders[index] = action.payload;
      }
    },
  },
});

export const {
  setAllProjectsDataHandler,
  setAllServicesDataHandler,
  setAllCoverImagesDataHandler,
  setAllProjectFoldersDataHandler,
} = collections.actions;
export default collections.reducer;
