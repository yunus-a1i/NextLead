import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import hrReducer from "./hrSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    hr: hrReducer,
    posts: postReducer,
  },
});

export default store;
