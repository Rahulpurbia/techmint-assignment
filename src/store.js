import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./store/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
