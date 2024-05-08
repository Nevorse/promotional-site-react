import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {},
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    destroyModal: (state) => {
        state.modal = [];
      },
  },
});

export const { setModal, destroyModal } = modal.actions;
export default modal.reducer;
