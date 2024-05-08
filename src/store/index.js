import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import collections from "./collections";
import modal from "./modal";

const store = configureStore({
  reducer: {
    auth,
    collections,
    modal
  },
});

export default store;